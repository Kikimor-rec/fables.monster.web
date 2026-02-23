import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "core",
    kicker: "Fables Monster",
    title: isRu ? "Новые миры для НРИ" : "New Worlds for TTRPG",
    subtitle: isRu ? "Sci-fi, хоррор, тёмная комедия и фэнтези" : "Sci-fi, horror, dark comedy, and fantasy",
    badge: "Social",
  });
}
