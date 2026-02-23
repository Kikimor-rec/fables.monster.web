import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "expedition",
    kicker: isRu ? "Миссия // APEX-418" : "Mission // APEX-418",
    title: isRu ? "Экспедиция-418" : "Expedition-418",
    subtitle: isRu ? "Extraction-НРИ о роботах в глубоком космосе" : "Extraction TTRPG about robots in deep space",
    badge: "In Development",
  });
}
