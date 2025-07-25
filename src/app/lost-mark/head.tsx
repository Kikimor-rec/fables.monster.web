import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "The Lost Mark | Fables Monster Studio",
  description: "A science fiction horror adventure for the role-playing game Mothership RPG. Your team encounters the wreckage of the tourist yacht Silk Star, which disappeared 217 years ago.",
  path: "/lost-mark",
  image: "/images/lost-mark/lm_promo_1.webp",
  type: "article",
});

export default function Head() {
  return null;
}
