"use client";

import { usePathname } from "next/navigation";
import BootSequence from "@/components/BootSequence";
import EasterEggs from "@/components/EasterEggs";

const LOCALE_LANDING_PATTERN = /^\/(en|ru)\/?$/;

export default function GlobalExperience() {
  const pathname = usePathname();
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction || !pathname || !LOCALE_LANDING_PATTERN.test(pathname)) {
    return null;
  }

  return (
    <>
      <BootSequence />
      <EasterEggs />
    </>
  );
}
