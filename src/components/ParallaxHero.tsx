"use client";

interface ParallaxHeroProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

function StaticHero({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-red-950/20" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function ParallaxHero({
  children,
  className = "",
}: ParallaxHeroProps) {
  // Отключаем parallax, всегда рендерим StaticHero
  return <StaticHero className={className}>{children}</StaticHero>;
}
