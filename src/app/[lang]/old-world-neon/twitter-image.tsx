import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "neon",
    kicker: "Encrypted Stream",
    title: isRu ? "Неоновый город" : "Neon City",
    subtitle: isRu ? "Корпорации, цифровые войны и операции высокого риска" : "Corps, digital warfare, and high-stakes heists",
    badge: "Social",
  });
}
