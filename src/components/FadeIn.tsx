"use client";

import dynamic from "next/dynamic";
import { ReactNode, Suspense, useState } from "react";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { 
    ssr: false,
    loading: () => <div className="opacity-0" />
  }
);

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = ""
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 30, opacity: 0 };
      case "down":
        return { y: -30, opacity: 0 };
      case "left":
        return { x: 30, opacity: 0 };
      case "right":
        return { x: -30, opacity: 0 };
      default:
        return { y: 30, opacity: 0 };
    }
  };

  const [glitched, setGlitched] = useState(false);

  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <MotionDiv
        initial={getInitialPosition()}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75]
        }}
        onAnimationComplete={() => setGlitched(true)}
        className={className + (glitched ? " terminal-glitch" : "")}
      >
        {children}
      </MotionDiv>
    </Suspense>
  );
}
