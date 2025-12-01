import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects | Fables Monster Studio",
  description: "Explore our tabletop RPG projects including Lost Mark, Cemetery of Broken Ships, and Hellish Bureaucracy.",
  path: "/projects",
  image: "/opengraph-image",
});

export default function Head() {
  return null;
}
