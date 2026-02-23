import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildSocialMetadata } from "@/lib/metadata";
import NewsletterUnsubscribeClient from "@/components/NewsletterUnsubscribeClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, "newsletter");
  const title = dict.unsubscribe.metaTitle || "Unsubscribe from Newsletter";
  const description = dict.unsubscribe.metaDescription || "Unsubscribe from Fables Monster Studio newsletter.";
  const social = buildSocialMetadata({
    lang,
    path: "/newsletter/unsubscribe",
    title,
    description,
    imagePath: `/${lang}/opengraph-image`,
  });

  return {
    title,
    description,
    ...social,
  };
}

export default async function NewsletterUnsubscribePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "newsletter");

  return <NewsletterUnsubscribeClient lang={lang} dict={dict.unsubscribe} />;
}
