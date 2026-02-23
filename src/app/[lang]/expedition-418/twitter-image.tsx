import { createStudioOgImage, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const { lang } = await params;

  const isRu = lang === "ru";

  return createStudioOgImage({
    theme: "expedition",
    kicker: "EXP-418",
    title: isRu ? "Собери бота" : "Build your bot",
    subtitle: isRu ? "Выполни задачу. Постарайся вернуться." : "Complete the objective. Try to make it back.",
    badge: "Social",
  });
}
