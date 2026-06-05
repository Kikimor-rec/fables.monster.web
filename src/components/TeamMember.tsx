"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    bio?: string;
    image: string;
    link?: string;
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
      return { symbols: ["AUD", "WAV", "BPM"], chipClass: "border-orange-300/60 text-orange-200" };
    case "writing":
      return { symbols: ["TXT", "LOG", "DOC"], chipClass: "border-red-300/60 text-red-200" };
    case "design":
      return { symbols: ["GRD", "LAY", "UI"], chipClass: "border-cyan-300/60 text-cyan-200" };
    case "art":
      return { symbols: ["ART", "INK", "VIS"], chipClass: "border-cyan-300/60 text-cyan-200" };
    case "code":
      return { symbols: ["</>", "{}", "01"], chipClass: "border-emerald-300/60 text-emerald-200" };
    case "tactic":
      return { symbols: ["MAP", "HEX", "OPS"], chipClass: "border-amber-300/60 text-amber-200" };
    default:
      return { symbols: ["CMD", "SIG", "SYS"], chipClass: "border-red-300/60 text-red-200" };
  }
}

function getHudProfile(role: string): HudProfile {
  const normalizedRole = role.toLowerCase();

  if (normalizedRole.includes("narrative") || normalizedRole.includes("сценар") || normalizedRole.includes("нарратив")) {
    return {
      label: "STORY-STREAM",
      accentTextClass: "text-red-300/85",
      accentBorderClass: "border-red-300/60",
      reticle: "ring",
      effect: "writing"
    };
  }

  if (normalizedRole.includes("developer") || normalizedRole.includes("разработ")) {
    return {
      label: "SYS-TRACE",
      accentTextClass: "text-emerald-300/85",
      accentBorderClass: "border-emerald-300/60",
      reticle: "cross",
      effect: "code"
    };
  }

  if (normalizedRole.includes("composer") || normalizedRole.includes("композитор")) {
    return {
      label: "AUDIO-SCOPE",
      accentTextClass: "text-orange-300/85",
      accentBorderClass: "border-orange-300/60",
      reticle: "bars",
      effect: "music"
    };
  }

  if (normalizedRole.includes("game designer") || normalizedRole.includes("геймдиз")) {
    return {
      label: "TACTIC-MAP",
      accentTextClass: "text-amber-300/85",
      accentBorderClass: "border-amber-300/60",
      reticle: "ring",
      effect: "tactic"
    };
  }

  if (normalizedRole.includes("illustrator") || normalizedRole.includes("artist") || normalizedRole.includes("иллюст") || normalizedRole.includes("худож")) {
    return {
      label: "BRUSH-FLOW",
      accentTextClass: "text-cyan-300/85",
      accentBorderClass: "border-cyan-300/60",
      reticle: "cross",
      effect: "art"
    };
  }

  if (normalizedRole.includes("graphic") || normalizedRole.includes("layout") || normalizedRole.includes("дизайн") || normalizedRole.includes("верст")) {
    return {
      label: "GRID-LINE",
      accentTextClass: "text-cyan-300/85",
      accentBorderClass: "border-cyan-300/60",
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
      accentTextClass: "text-red-300/85",
      accentBorderClass: "border-red-300/60",
      reticle: "ring",
      effect: "command"
    };
  }

  return {
    label: "VIS-PIPE",
    accentTextClass: "text-cyan-300/85",
    accentBorderClass: "border-cyan-300/60",
    reticle: "cross",
    effect: "design"
  };
}

function RoleEffectOverlay({ effect, isHovered }: { effect: HudProfile["effect"]; isHovered: boolean }) {
  if (effect === "music") {
    return (
      <>
        <div className="pointer-events-none absolute top-4 right-5 w-8 h-px bg-orange-200/70 z-[9] animate-pulse" />
        <div className="pointer-events-none absolute top-6 right-5 w-6 h-px bg-orange-200/55 z-[9] animate-pulse" />
        <div className="pointer-events-none absolute top-10 right-8 w-2 h-2 rounded-full bg-orange-200/50 z-[9] animate-bounce" />
        {isHovered && <div className="pointer-events-none absolute bottom-4 left-4 w-10 h-px bg-orange-200/60 z-[9] animate-pulse" />}
      </>
    );
  }

  if (effect === "writing") {
    return (
      <>
        <div className="pointer-events-none absolute top-4 left-4 w-16 h-px bg-red-200/70 z-[9] animate-pulse" />
        <div className="pointer-events-none absolute top-7 left-4 w-12 h-px bg-red-200/50 z-[9] animate-pulse" />
        <div className="pointer-events-none absolute top-10 left-4 w-9 h-px bg-red-200/40 z-[9] animate-pulse" />
        {isHovered && <div className="pointer-events-none absolute bottom-4 right-4 w-14 h-px bg-red-200/55 z-[9] animate-pulse" />}
      </>
    );
  }

  if (effect === "design") {
    return (
      <>
        <div className="pointer-events-none absolute left-4 right-4 top-1/3 h-px bg-cyan-200/35 z-[9]" />
        <div className="pointer-events-none absolute left-4 right-4 top-2/3 h-px bg-cyan-200/30 z-[9]" />
        <div className="pointer-events-none absolute top-4 bottom-4 left-1/3 w-px bg-cyan-200/25 z-[9]" />
        <div className="pointer-events-none absolute top-4 bottom-4 left-2/3 w-px bg-cyan-200/20 z-[9]" />
      </>
    );
  }

  if (effect === "art") {
    return (
      <>
        <div className="pointer-events-none absolute top-6 left-4 w-10 h-[2px] rotate-12 bg-cyan-200/45 z-[9]" />
        <div className="pointer-events-none absolute top-10 left-6 w-8 h-[2px] -rotate-12 bg-cyan-200/35 z-[9]" />
        <div className="pointer-events-none absolute bottom-8 right-4 w-10 h-[2px] -rotate-6 bg-cyan-200/40 z-[9]" />
        <div className="pointer-events-none absolute bottom-5 right-6 w-3 h-3 rounded-full bg-cyan-200/20 blur-[1px] z-[9] animate-pulse" />
      </>
    );
  }

  if (effect === "code") {
    return (
      <>
        <div className="pointer-events-none absolute top-4 left-4 w-3 h-3 border border-emerald-200/70 z-[9]" />
        <div className="pointer-events-none absolute top-4 left-9 w-2 h-3 bg-emerald-200/45 z-[9] animate-pulse" />
        <div className="pointer-events-none absolute top-9 left-4 w-10 h-px bg-emerald-200/50 z-[9]" />
        {isHovered && <div className="pointer-events-none absolute bottom-4 right-4 w-12 h-px bg-emerald-200/60 z-[9] animate-pulse" />}
      </>
    );
  }

  if (effect === "tactic") {
    return (
      <>
        <div className="pointer-events-none absolute top-4 left-4 w-2 h-2 rounded-full bg-amber-200/70 z-[9]" />
        <div className="pointer-events-none absolute bottom-6 right-4 w-2 h-2 rounded-full bg-amber-200/55 z-[9]" />
        <div className="pointer-events-none absolute top-5 left-6 right-6 h-px bg-amber-200/30 z-[9]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 w-14 h-14 -translate-x-1/2 -translate-y-1/2 border border-amber-200/25 z-[9]" />
      </>
    );
  }

  return (
    <>
      <div className="pointer-events-none absolute top-4 left-4 w-12 h-px bg-red-200/70 z-[9] animate-pulse" />
      <div className="pointer-events-none absolute top-7 left-4 w-8 h-px bg-red-200/50 z-[9] animate-pulse" />
      <div className="pointer-events-none absolute bottom-6 right-4 w-10 h-px bg-red-200/55 z-[9] animate-pulse" />
    </>
  );
}

export default function TeamMember({ member }: TeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hudProfile = getHudProfile(member.role);
  const artifactSet = getArtifactSet(hudProfile.effect);

  const content = (
    <div
      className="group relative w-full max-w-[18rem] min-h-[30rem] bg-black border border-red-700 p-6 hover:border-red-500 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitch overlay effect */}
      <div className={`absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? "animate-pulse" : ""}`}></div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(255,0,0,0.03)_100%)] bg-[length:100%_4px]"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Profile Image */}
        <div className="relative mb-6 mx-auto w-36 h-52 overflow-hidden bg-gray-900">
          <div className="absolute inset-0 border-2 border-red-700 group-hover:border-red-500 transition-colors duration-300 z-20"></div>

          {/* Main image or Placeholder */}
          {member.image ? (
            <>
              <Image
                src={`/images/crew/${member.image}?v=droid-portraits-20260427`}
                alt={member.name}
                fill
                className={`object-cover transition-all duration-300 ${
                  isHovered
                    ? "scale-105 grayscale-[12%] brightness-[0.94] contrast-[1.2]"
                    : "grayscale-[28%] brightness-[0.88] contrast-[1.15]"
                }`}
                style={{ objectPosition: "50% 10%" }}
                sizes="128px"
              />
              <div className="pointer-events-none absolute inset-0 cctv-tint opacity-60 z-[2]" />
              <div className="pointer-events-none absolute inset-0 hidden cctv-noise opacity-80 z-[3] sm:block" />
              <div className="pointer-events-none absolute inset-0 cctv-scanlines opacity-55 z-[4]" />
              <div className="pointer-events-none absolute inset-0 hidden cctv-interlace opacity-40 z-[5] sm:block" />
              <div className="pointer-events-none absolute inset-0 cctv-vignette opacity-45 z-[6]" />
              <div className="pointer-events-none absolute inset-0 border border-cyan-400/35 z-[7] opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className={`pointer-events-none absolute top-2 left-2 border-l border-t w-7 h-7 z-[8] ${hudProfile.accentBorderClass}`} />
              <div className={`pointer-events-none absolute top-2 right-2 border-r border-t w-7 h-7 z-[8] ${hudProfile.accentBorderClass}`} />
              <div className={`pointer-events-none absolute bottom-2 left-2 border-l border-b w-7 h-7 z-[8] ${hudProfile.accentBorderClass}`} />
              <div className={`pointer-events-none absolute bottom-2 right-2 border-r border-b w-7 h-7 z-[8] ${hudProfile.accentBorderClass}`} />
              {hudProfile.reticle === "cross" && (
                <>
                  <div className="pointer-events-none absolute top-1/2 left-1/2 hidden w-16 h-px -translate-x-1/2 -translate-y-1/2 bg-cyan-200/40 z-[8] sm:block" />
                  <div className="pointer-events-none absolute top-1/2 left-1/2 hidden h-16 w-px -translate-x-1/2 -translate-y-1/2 bg-cyan-200/40 z-[8] sm:block" />
                </>
              )}
              {hudProfile.reticle === "ring" && (
                <div className="pointer-events-none absolute top-1/2 left-1/2 hidden w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/35 z-[8] sm:block" />
              )}
              {hudProfile.reticle === "bars" && (
                <>
                  <div className="pointer-events-none absolute left-3 right-3 top-[38%] hidden h-px bg-orange-200/40 z-[8] sm:block" />
                  <div className="pointer-events-none absolute left-3 right-3 top-[62%] hidden h-px bg-orange-200/40 z-[8] sm:block" />
                </>
              )}
              <div className="pointer-events-none absolute top-2 left-2 hidden max-w-[4.5rem] truncate text-[9px] tracking-wider font-mono text-cyan-300/80 z-[8] sm:block">CAM_CREW</div>
              <div className={`pointer-events-none absolute top-2 right-2 hidden max-w-[5.5rem] truncate text-right text-[9px] tracking-wider font-mono z-[8] sm:block ${hudProfile.accentTextClass}`}>{hudProfile.label}</div>
              <div className="pointer-events-none absolute bottom-2 right-2 hidden max-w-[5.5rem] truncate text-right text-[9px] tracking-wider font-mono text-cyan-200/70 z-[8] sm:block">UNIT_{member.name.split(" ")[0].toUpperCase()}</div>
              <div className="pointer-events-none absolute bottom-3 left-3 z-[10] hidden items-center gap-1 sm:flex">
                {artifactSet.symbols.map((symbol) => (
                  <span
                    key={`${member.name}-${symbol}`}
                    className={`inline-flex min-w-[24px] justify-center rounded-sm border bg-black/60 px-1 py-[2px] text-[9px] font-mono leading-none animate-pulse ${artifactSet.chipClass}`}
                  >
                    {symbol}
                  </span>
                ))}
              </div>
              <div className="hidden sm:block">
                <RoleEffectOverlay effect={hudProfile.effect} isHovered={isHovered} />
              </div>
              {isHovered && (
                <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-300/12 to-transparent animate-pulse z-[8]" />
              )}
              {isHovered && <div className="pointer-events-none absolute left-0 right-0 hidden cctv-glitch-bar z-[9] opacity-100 sm:block" />}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-700 font-mono">
              <div className="text-4xl mb-2 opacity-50">?</div>
              <div className="text-xs tracking-widest uppercase">No Signal</div>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff000010_2px,#ff000010_4px)]"></div>
            </div>
          )}

          {/* Glitch effect overlay */}
          {isHovered && (
            <>
              <div className="absolute inset-0 bg-cyan-500/15 mix-blend-screen animate-pulse z-10" />
              <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay animate-ping z-10" />
            </>
          )}

          {/* Digital noise effect */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ibm9pc2UiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZjAwMDAiIG9wYWNpdHk9IjAuMSIvPjxyZWN0IHg9IjIiIHk9IjIiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiMwMGZmZmYiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbm9pc2UpIi8+PC9zdmc+')] animate-pulse z-10`}></div>
        </div>

        {/* Member Info */}
        <div className="text-center flex-grow flex flex-col">
          {/* Name with glitch text effect */}
          <h3 className="text-xl font-bold text-white mb-2 font-nunito group-hover:text-red-400 transition-colors duration-300 relative">
            {member.name}
            {isHovered && (
              <span className="absolute inset-0 text-red-500 opacity-50 animate-ping">
                {member.name}
              </span>
            )}
          </h3>

          {/* Role */}
          <div className="text-red-400 font-nunito text-sm mb-3 uppercase tracking-wider">
            {member.role}
          </div>

          <div className="mb-3 flex justify-center gap-1.5">
            {artifactSet.symbols.map((symbol) => (
              <span
                key={`${member.name}-meta-${symbol}`}
                className={`inline-flex min-w-[28px] justify-center rounded-sm border bg-black/40 px-1.5 py-0.5 text-[10px] font-mono animate-pulse ${artifactSet.chipClass}`}
              >
                {symbol}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-gray-300 text-sm font-nunito flex-grow leading-relaxed">
            {member.bio}
          </p>

          {/* Terminal-style cursor blink */}
          <div className="mt-4 text-red-500 font-nunito text-sm animate-pulse">
            {isHovered ? ">>> ACCESS GRANTED" : ">>> HOVER TO ACCESS"}
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-700 group-hover:border-red-500 transition-colors"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-700 group-hover:border-red-500 transition-colors"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-700 group-hover:border-red-500 transition-colors"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-700 group-hover:border-red-500 transition-colors"></div>
    </div >
  );

  // If member has a link, wrap in Link component
  if (member.link) {
    return (
      <Link
        href={member.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} — ${member.role} (opens in new tab)`}
        className="block cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        {content}
      </Link>
    );
  }

  return content;
}
