import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "lostMark",
    kicker: "Interactive Horror",
    title: isRu ? "Потерянный Марк" : "The Lost Mark",
    subtitle: isRu ? "Боди-хоррор, моральный выбор и космический ужас" : "Body horror, moral choices, and deep-space dread",
    badge: "Mothership",
  });
}
