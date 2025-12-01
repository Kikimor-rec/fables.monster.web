import { createMetadata } from "@/lib/seo";

export const metadata = {
  ...createMetadata({
    title: "SILK STAR Terminal | Lost Mark",
    description: "Access the SILK STAR ship terminal for mission logs and data.",
    path: "/lost-mark/terminal",
    image: "/opengraph-image",
  }),
  robots: "noindex, nofollow" as const,
};

export default function Head() {
  return null;
}
