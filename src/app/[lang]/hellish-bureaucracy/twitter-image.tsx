import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "hellish",
    kicker: "Infernal Office",
    title: isRu ? "Бюрократия ада" : "Hell Office",
    subtitle: isRu ? "Контракты, ред тейп и начальство из преисподней" : "Contracts, red tape, and infernal middle management",
    badge: "Social",
  });
}
