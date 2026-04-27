"use client";

import { useState, memo } from "react";
import OptimizedImage from "./OptimizedImage";

interface CompactTeamMemberProps {
  member: {
    name: string;
    role: string;
    image: string;
    status?: string;
    bio?: string;
    portfolio?: string;
  };
}

type HudProfile = {
  label: string;
  accentTextClass: string;
  accentBorderClass: string;
  reticle: "cross" | "ring" | "bars";
  effect: "music" | "writing" | "design" | "art" | "code" | "tactic" | "command";
};

function getArtifactSet(effect: HudProfile["effect"]) {
  switch (effect) {
    case "music":
      return { symbols: ["♪", "♫"], chipClass: "border-orange-300/60 text-orange-200" };
    case "writing":
      return { symbols: ["✎", "⋯"], chipClass: "border-red-300/60 text-red-200" };
    case "design":
      return { symbols: ["▦", "┼"], chipClass: "border-cyan-300/60 text-cyan-200" };
    case "art":
      return { symbols: ["✶", "◌"], chipClass: "border-cyan-300/60 text-cyan-200" };
    case "code":
      return { symbols: ["{}", "01"], chipClass: "border-emerald-300/60 text-emerald-200" };
    case "tactic":
      return { symbols: ["◈", "△"], chipClass: "border-amber-300/60 text-amber-200" };
    default:
      return { symbols: ["◆", "⇡"], chipClass: "border-red-300/60 text-red-200" };
  }
}

function getHudProfile(role: string): HudProfile {
  const normalizedRole = role.toLowerCase();

  if (normalizedRole.includes("narrative") || normalizedRole.includes("сценар") || normalizedRole.includes("нарратив")) {
    return {
      label: "STORY-STREAM",
      accentTextClass: "text-red-300/80",
      accentBorderClass: "border-red-300/55",
      reticle: "ring",
      effect: "writing"
    };
  }

  if (normalizedRole.includes("developer") || normalizedRole.includes("разработ")) {
    return {
      label: "SYS-TRACE",
      accentTextClass: "text-emerald-300/80",
      accentBorderClass: "border-emerald-300/55",
      reticle: "cross",
      effect: "code"
    };
  }

  if (normalizedRole.includes("composer") || normalizedRole.includes("композитор")) {
    return {
      label: "AUDIO-SCOPE",
      accentTextClass: "text-orange-300/80",
      accentBorderClass: "border-orange-300/55",
      reticle: "bars",
      effect: "music"
    };
  }

  if (normalizedRole.includes("game designer") || normalizedRole.includes("геймдиз")) {
    return {
      label: "TACTIC-MAP",
      accentTextClass: "text-amber-300/80",
      accentBorderClass: "border-amber-300/55",
      reticle: "ring",
      effect: "tactic"
    };
  }

  if (normalizedRole.includes("illustrator") || normalizedRole.includes("artist") || normalizedRole.includes("иллюст") || normalizedRole.includes("худож")) {
    return {
      label: "BRUSH-FLOW",
      accentTextClass: "text-cyan-300/80",
      accentBorderClass: "border-cyan-300/55",
      reticle: "cross",
      effect: "art"
    };
  }

  if (normalizedRole.includes("graphic") || normalizedRole.includes("layout") || normalizedRole.includes("дизайн") || normalizedRole.includes("верст")) {
    return {
      label: "GRID-LINE",
      accentTextClass: "text-cyan-300/80",
      accentBorderClass: "border-cyan-300/55",
      reticle: "cross",
      effect: "design"
    };
  }

  if (
    normalizedRole.includes("founder") ||
    normalizedRole.includes("producer") ||
    normalizedRole.includes("продюсер")
  ) {
    return {
      label: "CMD-LINK",
      accentTextClass: "text-red-300/80",
      accentBorderClass: "border-red-300/55",
      reticle: "ring",
      effect: "command"
    };
  }

  return {
    label: "VIS-PIPE",
    accentTextClass: "text-cyan-300/80",
    accentBorderClass: "border-cyan-300/55",
    reticle: "cross",
    effect: "design"
  };
}

function RoleEffectOverlay({ effect }: { effect: HudProfile["effect"] }) {
  if (effect === "music") {
    return (
      <>
        <div className="pointer-events-none absolute top-1 right-1 w-3 h-px bg-orange-200/70 animate-pulse" />
        <div className="pointer-events-none absolute top-2 right-1 w-2 h-px bg-orange-200/60 animate-pulse" />
        <div className="pointer-events-none absolute bottom-1 left-1 w-1 h-1 rounded-full bg-orange-200/65 animate-bounce" />
        <div className="pointer-events-none absolute bottom-2 left-2 w-1 h-1 rounded-full bg-orange-200/50 animate-bounce" />
      </>
    );
  }

  if (effect === "writing") {
    return (
      <>
        <div className="pointer-events-none absolute top-1 left-1 w-5 h-px bg-red-200/65 animate-pulse" />
        <div className="pointer-events-none absolute top-2 left-1 w-3 h-px bg-red-200/45 animate-pulse" />
        <div className="pointer-events-none absolute bottom-1 right-1 w-4 h-px bg-red-200/55 animate-pulse" />
      </>
    );
  }

  if (effect === "design") {
    return (
      <>
        <div className="pointer-events-none absolute top-2 left-2 right-2 h-px bg-cyan-200/35" />
        <div className="pointer-events-none absolute bottom-2 left-2 right-2 h-px bg-cyan-200/25" />
      </>
    );
  }

  if (effect === "art") {
    return (
      <>
        <div className="pointer-events-none absolute top-2 left-1 w-4 h-[2px] rotate-12 bg-cyan-200/40" />
        <div className="pointer-events-none absolute bottom-2 right-1 w-4 h-[2px] -rotate-12 bg-cyan-200/35" />
        <div className="pointer-events-none absolute top-1/2 right-1 w-2 h-2 rounded-full bg-cyan-200/25 blur-[1px] animate-pulse" />
      </>
    );
  }

  if (effect === "code") {
    return (
      <>
        <div className="pointer-events-none absolute top-1 left-1 w-2 h-2 border border-emerald-200/60" />
        <div className="pointer-events-none absolute top-1 left-4 w-1 h-2 bg-emerald-200/50 animate-pulse" />
        <div className="pointer-events-none absolute bottom-1 right-1 w-3 h-px bg-emerald-200/55 animate-pulse" />
      </>
    );
  }

  if (effect === "tactic") {
    return (
      <>
        <div className="pointer-events-none absolute top-1/2 left-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 border border-amber-200/35" />
        <div className="pointer-events-none absolute top-1 left-1 w-1 h-1 rounded-full bg-amber-200/60" />
        <div className="pointer-events-none absolute bottom-1 right-1 w-1 h-1 rounded-full bg-amber-200/50" />
      </>
    );
  }

  return (
    <>
      <div className="pointer-events-none absolute top-1 right-1 w-3 h-px bg-red-200/55 animate-pulse" />
      <div className="pointer-events-none absolute top-2 right-2 w-2 h-px bg-red-200/45 animate-pulse" />
    </>
  );
}

const CompactTeamMember = memo(function CompactTeamMember({ member }: CompactTeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hudProfile = getHudProfile(member.role);
  const artifactSet = getArtifactSet(hudProfile.effect);

  return (
    <div 
      className="group relative flex items-center bg-black border border-red-700 p-2 sm:p-3 hover:border-red-500 transition-all duration-300 hover:bg-red-950/20 w-full min-w-0 h-16 sm:h-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitch overlay */}
      <div className={`absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? "animate-pulse" : ""}`}></div>
      
      {/* Profile Image */}
      <div className="relative w-12 sm:w-14 h-12 sm:h-16 overflow-hidden mr-2 sm:mr-3">
        <div className="absolute inset-0 border border-red-700 group-hover:border-red-500 transition-colors duration-300"></div>
        
        {member.image ? (
          <>
            <OptimizedImage
              src={`/images/crew/${member.image}?v=droid-portraits-20260427`}
              alt={member.name}
              fill
              className={`transition-all duration-300 ${
                isHovered
                  ? "scale-105 grayscale-[20%] brightness-[0.92] contrast-[1.14]"
                  : "grayscale-[35%] brightness-[0.88] contrast-[1.12]"
              }`}
              style={{ objectFit: "cover", objectPosition: "50% 15%" }}
              sizes="(max-width: 640px) 48px, 56px"
            />
            <div className="pointer-events-none absolute inset-0 cctv-tint opacity-55" />
            <div className="pointer-events-none absolute inset-0 cctv-scanlines opacity-50" />
            <div className="pointer-events-none absolute inset-0 cctv-noise opacity-70" />
            <div className="pointer-events-none absolute inset-0 cctv-vignette opacity-40" />
            <div className={`pointer-events-none absolute top-0 left-0 border-l border-t w-4 h-4 ${hudProfile.accentBorderClass}`} />
            <div className={`pointer-events-none absolute bottom-0 right-0 border-r border-b w-4 h-4 ${hudProfile.accentBorderClass}`} />
            {hudProfile.reticle === "cross" && (
              <>
                <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-cyan-200/35" />
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-cyan-200/35" />
              </>
            )}
            {hudProfile.reticle === "ring" && (
              <>
                <div className="pointer-events-none absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/45" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/70" />
              </>
            )}
            {hudProfile.reticle === "bars" && (
              <>
                <div className="pointer-events-none absolute left-1 right-1 top-1/3 h-px bg-orange-200/45" />
                <div className="pointer-events-none absolute left-1 right-1 bottom-1/3 h-px bg-orange-200/45" />
              </>
            )}
            <div className={`pointer-events-none absolute top-1 left-1 text-[8px] font-mono tracking-wide ${hudProfile.accentTextClass}`}>{hudProfile.label}</div>
            <div className="pointer-events-none absolute bottom-1 left-1 flex gap-1">
              {artifactSet.symbols.map((symbol) => (
                <span
                  key={`${member.name}-compact-${symbol}`}
                  className={`inline-flex min-w-[14px] justify-center rounded-sm border bg-black/60 px-1 py-0 text-[8px] font-mono leading-none animate-pulse ${artifactSet.chipClass}`}
                >
                  {symbol}
                </span>
              ))}
            </div>
            <RoleEffectOverlay effect={hudProfile.effect} />
            {isHovered && (
              <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent animate-pulse" />
            )}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-cyan-300/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Mini glitch effect */}
            {isHovered && (
              <>
                <div className="absolute inset-0 bg-cyan-400/15 mix-blend-screen animate-pulse" />
                <div className="absolute left-0 right-0 h-[2px] bg-cyan-200/70 cctv-glitch-bar opacity-100" />
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-red-950/30 flex items-center justify-center border border-red-700 group-hover:border-red-500 transition-colors">
            <span className="text-red-500 text-lg font-bold font-orbitron">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Member Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-bold text-white font-nunito group-hover:text-red-400 transition-colors duration-300 truncate">
            {member.name}
        </h4>
        <p className="text-xs text-gray-400 font-nunito truncate">
          {member.role}
        </p>
      </div>
      
      {/* Status indicator */}
      <div className="w-2 h-2 border border-red-500 bg-red-500/30 group-hover:bg-red-500 group-hover:animate-pulse transition-all duration-300 ml-1 sm:ml-2 flex-shrink-0"></div>
    </div>
  );
});

export default CompactTeamMember;
