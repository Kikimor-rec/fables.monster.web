import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "kramp",
    kicker: isRu ? "Праздничный инцидент" : "Festive Incident Report",
    title: "Holiday Audit KRAMP.EXE",
    subtitle: isRu
      ? "Канун Рождества в глубоком космосе идет совсем не по протоколу"
      : "Christmas Eve in deep space goes catastrophically off protocol",
    badge: "One-shot",
  });
}
