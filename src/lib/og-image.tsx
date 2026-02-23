import { ImageResponse } from "next/og";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png";

type OgTheme = "core" | "lostMark" | "kramp" | "expedition" | "neon" | "hellish";

interface ThemePalette {
  backgroundA: string;
  backgroundB: string;
  accent: string;
  accentSoft: string;
  textSecondary: string;
}

const palettes: Record<OgTheme, ThemePalette> = {
  core: {
    backgroundA: "#050506",
    backgroundB: "#2b0a10",
    accent: "#ff4f52",
    accentSoft: "#7de7ff",
    textSecondary: "#d2d8e2",
  },
  lostMark: {
    backgroundA: "#030407",
    backgroundB: "#250b16",
    accent: "#ff6a5f",
    accentSoft: "#8ad2ff",
    textSecondary: "#dce1eb",
  },
  kramp: {
    backgroundA: "#08140e",
    backgroundB: "#31110f",
    accent: "#ff6f3d",
    accentSoft: "#8ff58f",
    textSecondary: "#e5e7eb",
  },
  expedition: {
    backgroundA: "#121a2f",
    backgroundB: "#2c1b2e",
    accent: "#ff8b4a",
    accentSoft: "#c7e3bf",
    textSecondary: "#d4dfd2",
  },
  neon: {
    backgroundA: "#050811",
    backgroundB: "#2b0d2f",
    accent: "#37f7ff",
    accentSoft: "#ff5ce5",
    textSecondary: "#d9e5f8",
  },
  hellish: {
    backgroundA: "#0f0606",
    backgroundB: "#2f1510",
    accent: "#ff7b4c",
    accentSoft: "#ffd47d",
    textSecondary: "#e9dfd3",
  },
};

interface StudioOgImageOptions {
  title: string;
  subtitle: string;
  kicker?: string;
  badge?: string;
  theme?: OgTheme;
}

export function createStudioOgImage({ title, subtitle, kicker, badge, theme = "core" }: StudioOgImageOptions) {
  const palette = palettes[theme];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 62px",
          color: "#f8fafc",
          backgroundImage: `radial-gradient(circle at 12% 10%, ${palette.accentSoft}33 0%, transparent 32%), radial-gradient(circle at 88% 16%, ${palette.accent}2f 0%, transparent 36%), linear-gradient(140deg, ${palette.backgroundA} 0%, ${palette.backgroundB} 100%)`,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            opacity: 0.16,
          }}
        />

        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: palette.accentSoft,
              fontWeight: 700,
            }}
          >
            {kicker || "Fables Monster Studio"}
          </div>
          {badge ? (
            <div
              style={{
                border: `2px solid ${palette.accent}`,
                color: palette.accent,
                padding: "8px 14px",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {badge}
            </div>
          ) : null}
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18, maxWidth: "90%" }}>
          <div
            style={{
              fontSize: 86,
              lineHeight: 0.94,
              fontWeight: 900,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              textWrap: "balance",
              textShadow: `0 0 28px ${palette.accent}66`,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.2,
              color: palette.textSecondary,
              textWrap: "balance",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#f1f5f9cc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 2, background: palette.accent }} />
            fables.monster
          </div>
          <div style={{ color: palette.accentSoft }}>EN / RU</div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
    }
  );
}
