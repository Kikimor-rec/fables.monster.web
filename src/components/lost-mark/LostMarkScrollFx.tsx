"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: string;
  dx1: string; dy1: string;
  dx2: string; dy2: string;
  dx3: string; dy3: string;
  dx4: string; dy4: string;
  delay: string;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2.5,
    opacity: 0.1 + Math.random() * 0.25,
    duration: `${18 + Math.random() * 25}s`,
    dx1: `${-30 + Math.random() * 60}px`,
    dy1: `${-40 + Math.random() * 80}px`,
    dx2: `${-25 + Math.random() * 50}px`,
    dy2: `${-20 + Math.random() * 40}px`,
    dx3: `${-35 + Math.random() * 70}px`,
    dy3: `${-30 + Math.random() * 60}px`,
    dx4: `${-20 + Math.random() * 40}px`,
    dy4: `${-35 + Math.random() * 70}px`,
    delay: `${-Math.random() * 20}s`,
  }));
}

export default function LostMarkScrollFx() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    // Generate particles on client
    const isMobile = window.innerWidth < 768;
    setParticles(generateParticles(isMobile ? 12 : 24));
    setShowParticles(true);

    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = docHeight > 0 ? currentY / docHeight : 0;

      // Drive scanline drift via CSS variable
      overlay.style.setProperty("--lm-scan-drift", `${currentY * 0.15}px`);

      // Drive vignette intensity (0.3 at top → 0.7 at bottom)
      const vignetteIntensity = 0.3 + scrollDepth * 0.4;
      document.documentElement.style.setProperty("--lm-vignette-intensity", String(vignetteIntensity));

      // Drive subtle image distortion based on scroll velocity
      const skew = Math.min(Math.max(delta * 0.03, 0), 1.5) * (currentY > lastScrollY.current ? 1 : -1);
      const flicker = delta > 30 ? Math.random() * 0.5 : 0;
      document.documentElement.style.setProperty("--lm-scroll-skew", String(skew));
      document.documentElement.style.setProperty("--lm-scroll-flicker", String(flicker));

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={overlayRef} className="lm-scroll-fx" aria-hidden="true" />
      <div className="lm-vignette" aria-hidden="true" />
      <div className="lm-fog" aria-hidden="true" />
      {showParticles && particles.length > 0 && (
        <div className="lm-particles" aria-hidden="true">
          {particles.map((p) => (
            <div
              key={p.id}
              className="lm-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                "--o": p.opacity,
                "--dur": p.duration,
                "--dx1": p.dx1, "--dy1": p.dy1,
                "--dx2": p.dx2, "--dy2": p.dy2,
                "--dx3": p.dx3, "--dy3": p.dy3,
                "--dx4": p.dx4, "--dy4": p.dy4,
                animationDelay: p.delay,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </>
  );
}
