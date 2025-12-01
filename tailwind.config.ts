import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        border: "var(--border)",
        // Spaceship Control Panel Neon Colors
        "cyber-cyan": "var(--cyber-cyan)",
        "cyber-magenta": "var(--cyber-magenta)",
        "cyber-green": "var(--cyber-green)",
        "neon-blue": "#00d4ff",
        "neon-purple": "#b066ff",
        "neon-orange": "#ff6b35",
        "neon-pink": "#ff006e",
        "space-dark": "#0a0a0f",
        "space-darker": "#050508",
      },
      fontFamily: {
        mono: ["Courier New", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)",
        "glow-red": "0 0 20px rgba(255, 31, 31, 0.5), 0 0 40px rgba(255, 31, 31, 0.3)",
        "glow-purple": "0 0 20px rgba(176, 102, 255, 0.5), 0 0 40px rgba(176, 102, 255, 0.3)",
        "glow-green": "0 0 20px rgba(0, 255, 159, 0.5), 0 0 40px rgba(0, 255, 159, 0.3)",
        "neon-intense": "0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        parallaxSlow: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-50px)" },
        },
        parallaxFast: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-100px)" },
        },
        starTwinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        nebulaFlow: {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "0.3" },
          "50%": { transform: "translateX(50px) translateY(30px)", opacity: "0.5" },
          "100%": { transform: "translateX(0) translateY(0)", opacity: "0.3" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px currentColor, 0 0 20px currentColor" },
          "50%": { boxShadow: "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        scanline: "scanline 3s linear infinite",
        "parallax-slow": "parallaxSlow 20s ease-in-out infinite alternate",
        "parallax-fast": "parallaxFast 15s ease-in-out infinite alternate",
        "star-twinkle": "starTwinkle 3s ease-in-out infinite",
        "nebula-flow": "nebulaFlow 30s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
