import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import NewsletterUnsubscribeClient from "@/components/NewsletterUnsubscribeClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, "newsletter");

  return {
    title: dict.unsubscribe.metaTitle || "Unsubscribe from Newsletter | Fables Monster Studio",
    description: dict.unsubscribe.metaDescription || "Unsubscribe from Fables Monster Studio newsletter.",
    alternates: {
      canonical: `https://fables.monster/${lang}/newsletter/unsubscribe`,
      languages: {
        en: "https://fables.monster/en/newsletter/unsubscribe",
        ru: "https://fables.monster/ru/newsletter/unsubscribe",
      },
    },
  };
}

export default async function NewsletterUnsubscribePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "newsletter");

  return <NewsletterUnsubscribeClient lang={lang} dict={dict.unsubscribe} />;
}
