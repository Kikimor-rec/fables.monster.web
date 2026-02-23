import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "hellish",
    kicker: isRu ? "Административный протокол" : "Administrative Protocol",
    title: "Hellish Bureaucracy",
    subtitle: isRu ? "Тёмная комедия о выживании в аду бумажной волокиты" : "Dark comedy about surviving infernal paperwork",
    badge: "In Development",
  });
}
