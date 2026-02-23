import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "lostMark",
    kicker: "Mission Dossier // SILK STAR",
    title: isRu ? "Потерянный Марк" : "The Lost Mark",
    subtitle: isRu ? "Научно-фантастический хоррор-ваншот для Mothership RPG" : "Sci-fi horror one-shot for Mothership RPG",
    badge: "Released",
  });
}
