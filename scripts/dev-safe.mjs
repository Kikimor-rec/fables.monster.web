import { spawn, spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const nextMarker = path
  .join("node_modules", "next", "dist", "server", "lib", "start-server.js")
  .replaceAll("/", "\\")
  .toLowerCase();
const cwdLower = cwd.replaceAll("/", "\\").toLowerCase();

function normalizeCommand(value) {
  return (value ?? "").replaceAll("/", "\\").toLowerCase();
}

function listStaleNextPidsWindows() {
  const result = spawnSync(
    "powershell",
    [
      "-NoProfile",
      "-Command",
      "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Select-Object ProcessId,CommandLine | ConvertTo-Json -Compress",
    ],
    { encoding: "utf8" }
  );

  if (result.status !== 0 || !result.stdout.trim()) {
    return [];
  }

  let processes;
  try {
    processes = JSON.parse(result.stdout);
  } catch {
    return [];
  }

  const list = Array.isArray(processes) ? processes : [processes];

  return list
    .filter((entry) => {
      const pid = Number(entry?.ProcessId);
      const command = normalizeCommand(entry?.CommandLine);
      return (
        Number.isFinite(pid) &&
        pid !== process.pid &&
        command.includes(nextMarker) &&
        command.includes(cwdLower)
      );
    })
    .map((entry) => Number(entry.ProcessId));
}

function listStaleNextPidsUnix() {
  const result = spawnSync("ps", ["-ax", "-o", "pid=,command="], {
    encoding: "utf8",
  });

  if (result.status !== 0 || !result.stdout.trim()) {
    return [];
  }

  return result.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const firstSpace = line.indexOf(" ");
      if (firstSpace === -1) return null;

      const pid = Number(line.slice(0, firstSpace));
      const command = normalizeCommand(line.slice(firstSpace + 1));

      if (
        Number.isFinite(pid) &&
        pid !== process.pid &&
        command.includes(normalizeCommand(nextMarker)) &&
        command.includes(normalizeCommand(cwd))
      ) {
        return pid;
      }

      return null;
    })
    .filter((pid) => pid !== null);
}

function killPid(pid) {
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(pid), "/F", "/T"], { stdio: "ignore" });
    return;
  }

  try {
    process.kill(pid, "SIGTERM");
  } catch {
    // ignore
  }
}

function cleanupStaleNextProcesses() {
  const pids = process.platform === "win32" ? listStaleNextPidsWindows() : listStaleNextPidsUnix();

  if (pids.length === 0) {
    return;
  }

  console.log(`[dev-safe] Stopping stale Next.js processes: ${pids.join(", ")}`);
  pids.forEach(killPid);
}

function cleanupTraceFile() {
  const tracePath = path.join(cwd, ".next", "trace");
  if (!existsSync(tracePath)) {
    return;
  }

  try {
    rmSync(tracePath, { force: true });
  } catch {
    // ignore lock errors; stale process cleanup should handle most cases
  }
}

function runNextDev() {
  const args = process.argv.slice(2);
  const nextBin = path.join(cwd, "node_modules", "next", "dist", "bin", "next");

  const child = spawn(process.execPath, [nextBin, "dev", ...args], {
    stdio: "inherit",
    cwd,
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}

cleanupStaleNextProcesses();
cleanupTraceFile();
runNextDev();
