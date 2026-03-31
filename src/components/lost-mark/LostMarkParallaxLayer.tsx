"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface LostMarkParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "y" | "x";
}

export default function LostMarkParallaxLayer({
  children,
  className = "",
  speed = 0.15,
  direction = "y",
}: LostMarkParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = speed * 100;
  const transform = useTransform(scrollYProgress, [0, 1], [`${-range}px`, `${range}px`]);

  const style = direction === "y" ? { y: transform } : { x: transform };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div className="will-change-transform" style={style}>
        {children}
      </motion.div>
    </div>
  );
}
