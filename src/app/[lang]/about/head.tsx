import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About | Fables Monster Studio",
  description: "Learn more about the Fables Monster Studio team and philosophy.",
  path: "/about",
  image: "/opengraph-image",
});

export default function Head() {
  return null;
}
