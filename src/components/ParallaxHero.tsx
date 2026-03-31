"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxHeroProps {
  children: React.ReactNode;
  className?: string;
  /** Speed multiplier for background movement (0 = fixed, 1 = normal scroll). Default 0.3 */
  speed?: number;
}

/**
 * Wraps hero section content with parallax scroll effect.
 * The background layer translates at `speed` rate relative to scroll.
 */
export default function ParallaxHero({
  children,
  className = "",
  speed = 0.3,
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        {/* Background decorative layers rendered below children */}
        <div className="absolute inset-0 opacity-20 motion-safe:animate-pulse [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-red-950/20" />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
