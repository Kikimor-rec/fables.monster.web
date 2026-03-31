"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  /** Enable staggered animation for direct children (wrap each child in its own motion.div) */
  stagger?: boolean;
  staggerDelay?: number;
}

const getOffset = (direction: string) => {
  switch (direction) {
    case "up":    return { x: 0, y: 30 };
    case "down":  return { x: 0, y: -30 };
    case "left":  return { x: 30, y: 0 };
    case "right": return { x: -30, y: 0 };
    default:      return { x: 0, y: 30 };
  }
};

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  stagger = false,
  staggerDelay = 0.08,
}: FadeInProps) {
  const offset = getOffset(direction);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger ? staggerDelay : 0,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrap each child of a staggered FadeIn in this component.
 * Usage:
 *   <FadeIn stagger>
 *     <FadeInItem><Card /></FadeInItem>
 *     <FadeInItem><Card /></FadeInItem>
 *   </FadeIn>
 */
export function FadeInItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const offset = getOffset(direction);

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
