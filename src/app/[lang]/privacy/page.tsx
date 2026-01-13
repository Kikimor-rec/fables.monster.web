import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: lang === 'ru' ? 'Политика конфиденциальности | Fables Monster Studio' : 'Privacy Policy | Fables Monster Studio',
    description: lang === 'ru'
      ? 'Политика конфиденциальности Fables Monster Studio. Как мы собираем, используем и защищаем вашу информацию.'
      : 'Fables Monster Studio Privacy Policy. How we collect, use, and protect your information.',
    alternates: {
      canonical: `https://fables.monster/${lang}/privacy`,
      languages: {
        'en': 'https://fables.monster/en/privacy',
        'ru': 'https://fables.monster/ru/privacy',
      },
    },
  };
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const content = {
    en: {
      title: "PRIVACY POLICY",
      lastUpdated: "Last Updated: January 13, 2025",
      intro: "At Fables Monster Studio, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.",
      sections: [
        {
          title: "1. Information We Collect",
          content: [
            "When you interact with our website, we may collect:",
            "• <strong>Contact Information:</strong> Name and email address when you contact us or subscribe to our newsletter",
            "• <strong>Usage Data:</strong> Anonymous analytics data about how you use our website",
            "• <strong>Technical Data:</strong> IP address, browser type, and device information"
          ]
        },
        {
          title: "2. How We Use Your Information",
          content: [
            "We use your information to:",
            "• Send you newsletters and updates about our projects (with your consent)",
            "• Respond to your inquiries and support requests",
            "• Improve our website and services",
            "• Comply with legal obligations"
          ]
        },
        {
          title: "3. Newsletter Subscriptions",
          content: [
            "When you subscribe to our newsletter:",
            "• We use <strong>double opt-in</strong> to confirm your subscription",
            "• You can unsubscribe at any time using the link in our emails",
            "• Your email is stored securely and never shared with third parties for marketing purposes",
            "• We use Listmonk, a self-hosted newsletter service, to manage subscriptions"
          ]
        },
        {
          title: "4. Data Storage and Security",
          content: [
            "• Your data is stored on secure servers",
            "• We use industry-standard encryption for data transmission",
            "• We implement appropriate technical and organizational measures to protect your data",
            "• We retain your data only as long as necessary for the purposes stated in this policy"
          ]
        },
        {
          title: "5. Your Rights",
          content: [
            "Under GDPR and other privacy laws, you have the right to:",
            "• <strong>Access:</strong> Request a copy of your personal data",
            "• <strong>Rectification:</strong> Correct inaccurate or incomplete data",
            "• <strong>Erasure:</strong> Request deletion of your data",
            "• <strong>Portability:</strong> Receive your data in a structured format",
            "• <strong>Withdraw Consent:</strong> Unsubscribe from communications at any time"
          ]
        },
        {
          title: "6. Cookies and Analytics",
          content: [
            "We use cookies and analytics tools to:",
            "• Understand how visitors use our website",
            "• Improve user experience",
            "• Measure the effectiveness of our content",
            "",
            "We use <strong>Vercel Analytics</strong> (privacy-friendly, no personal data collected) and optionally <strong>Google Analytics</strong>. You can control cookies through your browser settings."
          ]
        },
        {
          title: "7. Third-Party Services",
          content: [
            "We use the following third-party services:",
            "• <strong>Vercel:</strong> Website hosting (privacy policy: vercel.com/legal/privacy-policy)",
            "• <strong>Listmonk:</strong> Self-hosted newsletter service (data stored on our servers)",
            "• <strong>Email Service:</strong> For transactional and newsletter emails",
            "",
            "These services may have their own privacy policies, which we recommend reviewing."
          ]
        },
        {
          title: "8. Data Location and International Transfers",
          content: [
            "<strong>Data Storage Locations:</strong>",
            "• <strong>Website Hosting:</strong> Vercel (servers primarily in the United States and Europe)",
            "• <strong>Newsletter Service:</strong> Listmonk, self-hosted on our servers (data location: check with hosting provider)",
            "• <strong>Email Service:</strong> For newsletter and transactional emails (server location varies by provider)",
            "",
            "<strong>International Transfers:</strong>",
            "Your data may be transferred to and processed in countries outside your country of residence, including the United States and European Union. We ensure appropriate safeguards are in place in accordance with GDPR and other applicable data protection laws.",
            "",
            "For EEA/UK residents: When we transfer data outside the EEA/UK, we use approved safeguards such as Standard Contractual Clauses (SCCs) or rely on adequacy decisions by the European Commission."
          ]
        },
        {
          title: "9. Children's Privacy",
          content: [
            "Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
          ]
        },
        {
          title: "10. Changes to This Policy",
          content: [
            "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated \"Last Updated\" date."
          ]
        },
        {
          title: "11. Data Controller",
          content: [
            "The data controller responsible for processing your personal data is:",
            "• <strong>Name:</strong> Fables Monster Studio",
            "• <strong>Website:</strong> <a href='https://fables.monster' class='text-red-400 hover:text-red-300 transition-colors'>fables.monster</a>",
            "• <strong>Email:</strong> <a href='mailto:info@fables.monster' class='text-red-400 hover:text-red-300 transition-colors'>info@fables.monster</a>"
          ]
        },
        {
          title: "12. Contact Us",
          content: [
            "If you have questions about this Privacy Policy or want to exercise your rights, contact us:",
            "• <strong>Email:</strong> <a href='mailto:info@fables.monster' class='text-red-400 hover:text-red-300 transition-colors'>info@fables.monster</a>",
            "• <strong>Discord:</strong> <a href='https://discord.gg/qJS4h5usxe' target='_blank' rel='noopener noreferrer' class='text-red-400 hover:text-red-300 transition-colors'>Join our Discord</a>"
          ]
        }
      ]
    },
    ru: {
      title: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ",
      lastUpdated: "Последнее обновление: 13 января 2025",
      intro: "В Fables Monster Studio мы уважаем вашу конфиденциальность и стремимся защитить вашу личную информацию. Эта Политика конфиденциальности объясняет, как мы собираем, используем и защищаем ваши данные.",
      sections: [
        {
          title: "1. Информация, которую мы собираем",
          content: [
            "При взаимодействии с нашим сайтом мы можем собирать:",
            "• <strong>Контактную информацию:</strong> Имя и email адрес, когда вы связываетесь с нами или подписываетесь на рассылку",
            "• <strong>Данные об использовании:</strong> Анонимные аналитические данные о том, как вы используете наш сайт",
            "• <strong>Технические данные:</strong> IP-адрес, тип браузера и информация об устройстве"
          ]
        },
        {
          title: "2. Как мы используем вашу информацию",
          content: [
            "Мы используем вашу информацию для:",
            "• Отправки вам рассылок и обновлений о наших проектах (с вашего согласия)",
            "• Ответов на ваши запросы и обращения в поддержку",
            "• Улучшения нашего сайта и сервисов",
            "• Соблюдения юридических обязательств"
          ]
        },
        {
          title: "3. Подписка на рассылку",
          content: [
            "Когда вы подписываетесь на нашу рассылку:",
            "• Мы используем <strong>двойное подтверждение</strong> для подтверждения подписки",
            "• Вы можете отписаться в любое время, используя ссылку в наших письмах",
            "• Ваш email хранится безопасно и никогда не передается третьим лицам в маркетинговых целях",
            "• Мы используем Listmonk, самостоятельно размещенный сервис рассылок, для управления подписками"
          ]
        },
        {
          title: "4. Хранение и безопасность данных",
          content: [
            "• Ваши данные хранятся на защищенных серверах",
            "• Мы используем стандартное шифрование для передачи данных",
            "• Мы применяем соответствующие технические и организационные меры для защиты ваших данных",
            "• Мы храним ваши данные только так долго, как это необходимо для целей, указанных в этой политике"
          ]
        },
        {
          title: "5. Ваши права",
          content: [
            "В соответствии с GDPR и другими законами о конфиденциальности, вы имеете право:",
            "• <strong>Доступ:</strong> Запросить копию ваших персональных данных",
            "• <strong>Исправление:</strong> Исправить неточные или неполные данные",
            "• <strong>Удаление:</strong> Запросить удаление ваших данных",
            "• <strong>Переносимость:</strong> Получить ваши данные в структурированном формате",
            "• <strong>Отзыв согласия:</strong> Отписаться от коммуникаций в любое время"
          ]
        },
        {
          title: "6. Cookies и аналитика",
          content: [
            "Мы используем cookies и инструменты аналитики для:",
            "• Понимания того, как посетители используют наш сайт",
            "• Улучшения пользовательского опыта",
            "• Измерения эффективности нашего контента",
            "",
            "Мы используем <strong>Vercel Analytics</strong> (дружественный к конфиденциальности, без сбора персональных данных) и опционально <strong>Google Analytics</strong>. Вы можете управлять cookies через настройки браузера."
          ]
        },
        {
          title: "7. Сторонние сервисы",
          content: [
            "Мы используем следующие сторонние сервисы:",
            "• <strong>Vercel:</strong> Хостинг сайта (политика конфиденциальности: vercel.com/legal/privacy-policy)",
            "• <strong>Listmonk:</strong> Самостоятельно размещенный сервис рассылок (данные хранятся на наших серверах)",
            "• <strong>Email-сервис:</strong> Для транзакционных писем и рассылок",
            "",
            "Эти сервисы могут иметь свои собственные политики конфиденциальности, которые мы рекомендуем изучить."
          ]
        },
        {
          title: "8. Местоположение данных и международная передача",
          content: [
            "<strong>Местоположение хранения данных:</strong>",
            "• <strong>Хостинг сайта:</strong> Vercel (серверы преимущественно в США и Европе)",
            "• <strong>Сервис рассылок:</strong> Listmonk, размещен на наших серверах (местоположение данных: уточните у провайдера хостинга)",
            "• <strong>Email-сервис:</strong> Для рассылок и транзакционных писем (местоположение серверов зависит от провайдера)",
            "",
            "<strong>Международная передача данных:</strong>",
            "Ваши данные могут передаваться и обрабатываться в странах за пределами вашей страны проживания, включая США и Европейский Союз. Мы обеспечиваем соответствующие меры защиты в соответствии с GDPR и другими применимыми законами о защите данных.",
            "",
            "Для резидентов ЕЭЗ/Великобритании: При передаче данных за пределы ЕЭЗ/Великобритании мы используем утвержденные меры защиты, такие как Стандартные договорные оговорки (SCC), или полагаемся на решения Европейской комиссии о достаточности."
          ]
        },
        {
          title: "9. Конфиденциальность детей",
          content: [
            "Наши сервисы не предназначены для лиц младше 16 лет. Мы сознательно не собираем персональную информацию от детей. Если вы считаете, что мы собрали информацию от ребенка, пожалуйста, немедленно свяжитесь с нами."
          ]
        },
        {
          title: "10. Изменения в этой политике",
          content: [
            "Мы можем обновлять эту Политику конфиденциальности время от времени. Мы уведомим вас о значительных изменениях, разместив новую политику на этой странице с обновленной датой \"Последнее обновление\"."
          ]
        },
        {
          title: "11. Оператор персональных данных",
          content: [
            "Оператором персональных данных, ответственным за обработку ваших данных, является:",
            "• <strong>Название:</strong> Fables Monster Studio",
            "• <strong>Веб-сайт:</strong> <a href='https://fables.monster' class='text-red-400 hover:text-red-300 transition-colors'>fables.monster</a>",
            "• <strong>Email:</strong> <a href='mailto:info@fables.monster' class='text-red-400 hover:text-red-300 transition-colors'>info@fables.monster</a>"
          ]
        },
        {
          title: "12. Связаться с нами",
          content: [
            "Если у вас есть вопросы об этой Политике конфиденциальности или вы хотите реализовать свои права, свяжитесь с нами:",
            "• <strong>Email:</strong> <a href='mailto:info@fables.monster' class='text-red-400 hover:text-red-300 transition-colors'>info@fables.monster</a>",
            "• <strong>Discord:</strong> <a href='https://discord.gg/qJS4h5usxe' target='_blank' rel='noopener noreferrer' class='text-red-400 hover:text-red-300 transition-colors'>Присоединяйтесь к Discord</a>"
          ]
        }
      ]
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
            {t.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-black border border-red-700 p-8 mb-8">
            <p className="text-gray-300 font-rajdhani text-lg leading-relaxed">
              {t.intro}
            </p>
          </div>

          {t.sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <div className="bg-black border border-red-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-4 font-orbitron tracking-wide text-glow-sm">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-gray-300 font-rajdhani text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href={`/${lang}`}
              className="inline-block bg-red-700 hover:bg-red-600 text-white px-8 py-3 font-orbitron font-bold transition-colors border border-red-600"
            >
              {lang === 'ru' ? '← ВЕРНУТЬСЯ НА ГЛАВНУЮ' : '← BACK TO HOME'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
