"use client";

import { useState } from "react";
import Image from "next/image";

interface ExpeditionHeroLogoProps {
  title: string;
}

export default function ExpeditionHeroLogo({ title }: ExpeditionHeroLogoProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  if (logoFailed) {
    return (
      <h1 className="relative z-10 text-4xl font-bold uppercase tracking-tight leading-[0.92] text-[#c6d9c6] opacity-90 drop-shadow-[0_6px_0_rgba(24,33,60,0.45)] sm:text-6xl md:text-8xl lg:text-9xl [font-family:var(--font-exp-heading)]">
        {title}
      </h1>
    );
  }

  return (
    <Image
      src="/logos/logo-white-new.svg"
      alt={title}
      width={520}
      height={134}
      priority
      className="mx-auto w-64 sm:w-80 md:w-[420px] lg:w-[520px] drop-shadow-[0_6px_18px_rgba(246,123,64,0.35)]"
      onError={() => setLogoFailed(true)}
    />
  );
}
