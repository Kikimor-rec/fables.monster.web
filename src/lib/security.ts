import type { NextRequest } from "next/server";
import { isIP } from "node:net";

const FALLBACK_ALLOWED_ORIGINS = ["https://fables.monster", "https://www.fables.monster"];

function normalizeIp(candidate: string): string | null {
  const trimmed = candidate.trim();
  if (!trimmed) return null;

  const withoutPort = trimmed.startsWith("[")
    ? trimmed
    : trimmed.split(":").length > 2
      ? trimmed
      : trimmed.split(":")[0];

  return isIP(withoutPort) ? withoutPort : null;
}

export function getClientIp(request: NextRequest): string | null {
  const chain = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
  ];

  for (const value of chain) {
    if (!value) continue;
    const first = value.split(",")[0] ?? "";
    const ip = normalizeIp(first);
    if (ip) return ip;
  }

  return null;
}

export function getClientIdentifier(request: NextRequest): string {
  const ip = getClientIp(request);
  if (ip) return `ip:${ip}`;

  const userAgent = (request.headers.get("user-agent") || "unknown").slice(0, 160);
  return `ua:${userAgent}`;
}

export function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!host) return false;

  const proto = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(":", "");
  const expectedOrigin = `${proto}://${host}`;

  if (origin === expectedOrigin) return true;

  const envAllowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const allowedOrigins = [...new Set([...FALLBACK_ALLOWED_ORIGINS, ...envAllowed])];
  return allowedOrigins.includes(origin);
}

export function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";

  if (localPart.length <= 2) {
    return `${localPart[0] ?? "*"}***@${domain}`;
  }

  const prefix = localPart.slice(0, 2);
  return `${prefix}***@${domain}`;
}

