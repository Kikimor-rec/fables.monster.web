"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface LostMarkParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "y" | "x";
}

/** Inner component that actually registers the scroll listener — only mounted when parallax is active */
function ParallaxMotion({
  children,
  className,
  speed,
  direction,
}: Required<Pick<LostMarkParallaxLayerProps, "children" | "className" | "speed" | "direction">>) {
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

export default function LostMarkParallaxLayer({
  children,
  className = "",
  speed = 0.15,
  direction = "y",
}: LostMarkParallaxLayerProps) {
  const [disabled, setDisabled] = useState(true); // default disabled until client check

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobileViewport = window.innerWidth < 1024;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const hasSaveData = Boolean(connection?.saveData);
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const isLowPowerDevice = typeof deviceMemory === "number" ? deviceMemory <= 4 : false;

    setDisabled(mq.matches || isMobileViewport || hasSaveData || isLowPowerDevice);
  }, []);

  if (disabled) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <ParallaxMotion className={className} speed={speed} direction={direction}>
      {children}
    </ParallaxMotion>
  );
}
