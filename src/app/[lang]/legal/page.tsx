import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === 'ru' ? 'Юридическая информация | Fables Monster Studio' : 'Legal Information | Fables Monster Studio',
    description: lang === 'ru'
      ? 'Юридическая информация и реквизиты Fables Monster Studio.'
      : 'Legal information and company details for Fables Monster Studio.',
    alternates: {
      canonical: `https://fables.monster/${lang}/legal`,
      languages: {
        'en': 'https://fables.monster/en/legal',
        'ru': 'https://fables.monster/ru/legal',
      },
    },
  };
}

export default async function LegalInfo({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const content = {
    en: {
      title: "LEGAL INFORMATION",
      subtitle: "Legal Representative",
      intro: "Fables Monster Studio operates through the following legal entity:",
      companyInfo: {
        title: "Company Details",
        name: "Limited Liability Partnership \"Labertar\"",
        nameShort: "Labertar LLP",
        bin: "221240028074",
        binLabel: "Business Identification Number (BIN)",
        address: "Republic of Kazakhstan, City of Almaty, Auezov District, Mamyr-4 Microdistrict, Building 49",
        addressLabel: "Legal Address",
      },
      contact: {
        title: "Contact for Legal Inquiries",
        email: "info@fables.monster",
        emailLabel: "Email",
        note: "For general inquiries, please use our contact form.",
      },
      disclaimer: {
        title: "Disclaimer",
        content: "All products, services, and content provided by Fables Monster Studio are offered through Labertar LLP. By purchasing our products or using our services, you enter into an agreement with Labertar LLP.",
      },
      backButton: "← BACK TO HOME",
    },
    ru: {
      title: "ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ",
      subtitle: "Юридический представитель",
      intro: "Fables Monster Studio осуществляет деятельность через следующее юридическое лицо:",
      companyInfo: {
        title: "Реквизиты компании",
        name: "Товарищество с ограниченной ответственностью \"Лабертар\"",
        nameShort: "ТОО \"Лабертар\"",
        bin: "221240028074",
        binLabel: "Бизнес-идентификационный номер (БИН)",
        address: "Республика Казахстан, город Алматы, Ауэзовский район, микрорайон Мамыр-4, дом 49",
        addressLabel: "Юридический адрес",
      },
      contact: {
        title: "Контакт для юридических вопросов",
        email: "info@fables.monster",
        emailLabel: "Email",
        note: "Для общих вопросов, пожалуйста, используйте форму обратной связи.",
      },
      disclaimer: {
        title: "Отказ от ответственности",
        content: "Все продукты, услуги и контент, предоставляемые Fables Monster Studio, предлагаются через ТОО \"Лабертар\". Приобретая наши продукты или используя наши услуги, вы вступаете в договорные отношения с ТОО \"Лабертар\".",
      },
      backButton: "← ВЕРНУТЬСЯ НА ГЛАВНУЮ",
    }
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg text-center">
            {t.title}
          </h1>
          <p className="text-center text-gray-400 font-rajdhani text-lg">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6">
          {/* Intro */}
          <div className="bg-black border border-red-700 p-8 mb-8">
            <p className="text-gray-300 font-rajdhani text-lg leading-relaxed">
              {t.intro}
            </p>
          </div>

          {/* Company Info */}
          <div className="mb-8">
            <div className="bg-black border border-red-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron tracking-wide text-glow-sm">
                {t.companyInfo.title}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 font-rajdhani text-sm uppercase tracking-wide mb-1">
                    {lang === 'ru' ? 'Полное наименование' : 'Full Name'}
                  </p>
                  <p className="text-white font-rajdhani text-lg">
                    {t.companyInfo.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 font-rajdhani text-sm uppercase tracking-wide mb-1">
                    {lang === 'ru' ? 'Сокращённое наименование' : 'Short Name'}
                  </p>
                  <p className="text-white font-rajdhani text-lg">
                    {t.companyInfo.nameShort}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 font-rajdhani text-sm uppercase tracking-wide mb-1">
                    {t.companyInfo.binLabel}
                  </p>
                  <p className="text-white font-rajdhani text-lg font-mono">
                    {t.companyInfo.bin}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 font-rajdhani text-sm uppercase tracking-wide mb-1">
                    {t.companyInfo.addressLabel}
                  </p>
                  <p className="text-white font-rajdhani text-lg">
                    {t.companyInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <div className="bg-black border border-red-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron tracking-wide text-glow-sm">
                {t.contact.title}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 font-rajdhani text-sm uppercase tracking-wide mb-1">
                    {t.contact.emailLabel}
                  </p>
                  <a
                    href={`mailto:${t.contact.email}`}
                    className="text-red-400 hover:text-red-300 transition-colors font-rajdhani text-lg"
                  >
                    {t.contact.email}
                  </a>
                </div>
                <p className="text-gray-400 font-rajdhani text-base">
                  {t.contact.note}{' '}
                  <Link
                    href={`/${lang}/contact`}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    {lang === 'ru' ? 'Связаться с нами →' : 'Contact us →'}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-8">
            <div className="bg-black border border-red-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron tracking-wide text-glow-sm">
                {t.disclaimer.title}
              </h2>
              <p className="text-gray-300 font-rajdhani text-lg leading-relaxed">
                {t.disclaimer.content}
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href={`/${lang}`}
              className="inline-block bg-red-700 hover:bg-red-600 text-white px-8 py-3 font-orbitron font-bold transition-colors border border-red-600"
            >
              {t.backButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
