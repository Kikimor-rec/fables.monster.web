import { createMetadata } from "@/lib/seo";
export const metadata = {
  ...createMetadata(
    "SILK STAR Terminal | Lost Mark",
    "Access the SILK STAR ship terminal for mission logs and data.",
    "/lost-mark/terminal",
  ),
  robots: "noindex, nofollow" as const,
};
export default function Head() {
  return null;
}
