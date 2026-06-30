import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const cwdNeedle = cwd.replaceAll('/', '\\').toLowerCase();
const nextNeedles = [
  'node_modules\\next\\dist\\bin\\next',
  'node_modules\\next\\dist\\server\\lib\\start-server.js',
  '.next\\dev\\build',
  'node_modules\\next\\dist\\compiled\\jest-worker\\processchild.js',
  'node_modules\\@playwright\\test\\cli.js',
];

function normalize(value = '') {
  return value.replaceAll('/', '\\').toLowerCase();
}

function listProjectProcesses() {
  if (process.platform !== 'win32') return [];

  const result = spawnSync(
    'powershell',
    [
      '-NoProfile',
      '-Command',
      'Get-CimInstance Win32_Process -Filter "Name=\'node.exe\'" | Select-Object ProcessId,CommandLine | ConvertTo-Json -Compress',
    ],
    { encoding: 'utf8' },
  );

  if (result.status !== 0 || !result.stdout.trim()) return [];

  const parsed = JSON.parse(result.stdout);
  const entries = Array.isArray(parsed) ? parsed : [parsed];

  return entries
    .map((entry) => ({ pid: Number(entry.ProcessId), command: normalize(entry.CommandLine) }))
    .filter((entry) => Number.isFinite(entry.pid) && entry.pid !== process.pid)
    .filter((entry) => entry.command.includes(cwdNeedle))
    .filter((entry) => nextNeedles.some((needle) => entry.command.includes(needle)));
}

function killProcess(pid) {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/PID', String(pid), '/F', '/T'], { stdio: 'ignore' });
    return;
  }

  try {
    process.kill(pid, 'SIGTERM');
  } catch {
    // ignore
  }
}

const processes = listProjectProcesses();
if (processes.length > 0) {
  console.log(`[e2e-cleanup] Stopping project Node processes: ${processes.map((entry) => entry.pid).join(', ')}`);
  processes.forEach((entry) => killProcess(entry.pid));
}

const devPath = path.join(cwd, '.next', 'dev');
if (existsSync(devPath)) {
  console.log('[e2e-cleanup] Removing .next/dev generated artifacts');
  rmSync(devPath, { recursive: true, force: true });
}
