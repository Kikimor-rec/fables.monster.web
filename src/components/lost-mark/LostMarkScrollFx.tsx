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
  const vignetteRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const latestScrollY = useRef(0);
  const isTicking = useRef(false);
  const lastScrollY = useRef(0);
  const lastVignette = useRef(-1);
  const lastSkew = useRef(Number.NaN);
  const [enabled, setEnabled] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const isMobileViewport = window.innerWidth < 1024;
    const hasSaveData = Boolean(connection?.saveData);
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const isLowPowerDevice = typeof deviceMemory === "number" ? deviceMemory <= 4 : false;

    if (mq.matches || isMobileViewport || hasSaveData || isLowPowerDevice) {
      setEnabled(false);
      setShowParticles(false);
      return;
    }

    setEnabled(true);

    // Generate particles on client — reduced from 16 to 8 for performance
    setParticles(generateParticles(8));
    setShowParticles(true);

    const overlay = overlayRef.current;
    const vignette = vignetteRef.current;
    if (!overlay) return;

    const applyScrollFx = () => {
      isTicking.current = false;

      const currentY = latestScrollY.current;
      const delta = Math.abs(currentY - lastScrollY.current);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = docHeight > 0 ? currentY / docHeight : 0;

      // Drive scanline drift via CSS variable (scoped to overlay — no cascade)
      overlay.style.setProperty("--lm-scan-drift", `${currentY * 0.15}px`);

      // Drive vignette intensity (0.3 at top -> 0.7 at bottom) — scoped to vignette element
      const vignetteIntensity = Math.round((0.3 + scrollDepth * 0.4) * 20) / 20; // coarser steps (0.05 increments)
      if (vignetteIntensity !== lastVignette.current && vignette) {
        vignette.style.opacity = String(vignetteIntensity);
        lastVignette.current = vignetteIntensity;
      }

      // Drive subtle image distortion based on scroll velocity
      const direction = currentY >= lastScrollY.current ? 1 : -1;
      const skew = Math.min(delta * 0.018, 0.6) * direction;

      if (Math.abs(skew - lastSkew.current) > 0.05) {
        document.documentElement.style.setProperty("--lm-scroll-skew", String(skew));
        lastSkew.current = skew;
      }

      lastScrollY.current = currentY;
    };

    const handleScroll = () => {
      latestScrollY.current = window.scrollY;
      if (isTicking.current) return;
      isTicking.current = true;
      rafRef.current = window.requestAnimationFrame(applyScrollFx);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={overlayRef} className="lm-scroll-fx" aria-hidden="true" />
      <div ref={vignetteRef} className="lm-vignette" aria-hidden="true" />
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
