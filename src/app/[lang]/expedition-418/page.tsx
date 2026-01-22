import { Metadata } from "next";
import Link from 'next/link';
import { getContent, getFrontmatterString } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = await getContent('projects', 'expedition-418', lang);
  const title = content ? getFrontmatterString(content.frontmatter, 'title') : '';
  const tagline = content ? getFrontmatterString(content.frontmatter, 'tagline') : '';

  return {
    title: `${title || 'Expedition-418'} - Extraction TTRPG | Fables Monster Studio`,
    description: tagline || 'An extraction TTRPG about small and big robots on very important missions.',
    alternates: {
      canonical: `https://fables.monster/${lang}/expedition-418`,
      languages: {
        'en': 'https://fables.monster/en/expedition-418',
        'ru': 'https://fables.monster/ru/expedition-418',
      },
    },
  }
}

export const dynamic = 'force-static';

// Static noise placeholder component
function StaticNoisePlaceholder() {
  return (
    <div className="relative w-full aspect-video bg-gray-900 border-2 border-cyan-700 overflow-hidden static-noise-container">
      {/* SVG filter for noise effect */}
      <svg className="absolute w-0 h-0">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="monoNoise"
          />
          <feComponentTransfer in="monoNoise" result="brighterNoise">
            <feFuncR type="linear" slope="1.5" intercept="-0.1"/>
            <feFuncG type="linear" slope="1.5" intercept="-0.1"/>
            <feFuncB type="linear" slope="1.5" intercept="-0.1"/>
          </feComponentTransfer>
        </filter>
      </svg>

      {/* Static noise layers */}
      <div className="absolute inset-0 static-noise-layer opacity-80"></div>
      <div className="absolute inset-0 static-noise-layer-2 opacity-60"></div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines-overlay"></div>

      {/* Interference bars */}
      <div className="absolute inset-0 interference-bars"></div>

      {/* CRT vignette */}
      <div className="absolute inset-0 bg-radial-vignette"></div>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-cyan-400 font-mono text-sm mb-2 glitch-text-fast opacity-70" data-text="SIGNAL LOST">
          SIGNAL LOST
        </div>
        <div className="text-cyan-500 font-orbitron text-2xl md:text-4xl font-bold tracking-wider static-text-flicker">
          TRANSMISSION PENDING
        </div>
        <div className="text-gray-500 font-mono text-xs mt-4 opacity-60">
          [ IMAGE DATA CORRUPTED ]
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500 opacity-50"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-500 opacity-50"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-500 opacity-50"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500 opacity-50"></div>
    </div>
  );
}

export default async function Expedition418({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const content = await getContent('projects', 'expedition-418', lang);

  const contentTitle = content ? getFrontmatterString(content.frontmatter, 'title') : '';
  const contentTagline = content ? getFrontmatterString(content.frontmatter, 'tagline') : '';
  const contentSubtitle = content ? getFrontmatterString(content.frontmatter, 'subtitle') : '';

  const isRussian = lang === 'ru';

  const stats = [
    { label: isRussian ? "Система" : "System", value: "Expedition-418" },
    { label: isRussian ? "Игроков" : "Players", value: "2-5" },
    { label: isRussian ? "Сессия" : "Duration", value: isRussian ? "2-4 ч" : "2-4 hrs" },
    { label: isRussian ? "Формат" : "Format", value: isRussian ? "Кампании / Ваншоты" : "Campaigns / One-shots" }
  ];

  // Feature icons
  const FeatureIcons = {
    robot: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="4" width="14" height="12" rx="2" />
        <circle cx="9" cy="9" r="1" fill="currentColor" />
        <circle cx="15" cy="9" r="1" fill="currentColor" />
        <path d="M9 13h6" />
        <path d="M8 16v4M16 16v4" />
        <path d="M12 2v2" />
      </svg>
    ),
    extraction: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v10M12 12l4-4M12 12l-4-4" />
        <path d="M3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4" />
        <path d="M7 15h10" />
      </svg>
    ),
    campaign: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <path d="M8 7h8M8 11h8M8 15h4" />
      </svg>
    ),
    chaos: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l2 2" />
        <path d="M8.5 8.5l1 1M14.5 8.5l-1 1" />
        <path d="M9 16c.5-.5 1.5-1 3-1s2.5.5 3 1" />
      </svg>
    )
  };

  const features = [
    {
      title: isRussian ? "Создание роботов" : "Robot Creation",
      description: isRussian
        ? "Необычная система сборки роботов. Шасси, модули, сенсоры — каждый бот уникален."
        : "Unique robot building system. Chassis, modules, sensors — every bot is different.",
      icon: FeatureIcons.robot
    },
    {
      title: isRussian ? "Extraction-геймплей" : "Extraction Gameplay",
      description: isRussian
        ? "Войти, выполнить задачу, выбраться. Планы рушатся, оборудование ломается."
        : "Get in, complete the objective, get out. Plans fall apart, equipment breaks down.",
      icon: FeatureIcons.extraction
    },
    {
      title: isRussian ? "Кампании и ваншоты" : "Campaigns & One-shots",
      description: isRussian
        ? "Быстрые ваншоты, полные абсурда, или длинные кампании с развитием персонажей."
        : "Quick one-shots full of absurdity, or extended campaigns with character progression.",
      icon: FeatureIcons.campaign
    },
    {
      title: isRussian ? "Абсурдные ситуации" : "Absurd Situations",
      description: isRussian
        ? "Опасные и абсурдные ситуации. Напряжение и неожиданный юмор."
        : "Dangerous and absurd scenarios. High tension meets unexpected humor.",
      icon: FeatureIcons.chaos
    }
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-cyan-950/20"></div>

        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-24 md:pt-32">
          {/* Status badge */}
          <div className="mb-6">
            <span className="px-4 py-2 bg-cyan-900/50 border border-cyan-500 text-cyan-400 font-orbitron text-sm tracking-wider">
              {isRussian ? "В РАЗРАБОТКЕ" : "IN DEVELOPMENT"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 font-orbitron tracking-wider glitch-text" data-text={contentTitle || 'EXPEDITION-418'}>
            {contentTitle || 'EXPEDITION-418'}
          </h1>

          <p className="text-lg md:text-xl text-cyan-400 mb-6 font-orbitron tracking-wide">
            {contentSubtitle || (isRussian ? 'Extraction TTRPG о роботах больших и маленьких' : 'Extraction TTRPG About Robots Big and Small')}
          </p>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-rajdhani">
            {contentTagline || (isRussian
              ? 'Роботы всех размеров на критически важных миссиях. Собери бота, выполни экстракцию, постарайся не сломаться.'
              : 'Robots big and small on critically important missions. Build your bot, complete the extraction, try not to break down.')}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-3xl mx-auto w-full">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/60 border border-cyan-700 stat-block p-2 sm:p-3 hover:border-cyan-500 transition-colors">
                <div className="text-lg sm:text-2xl font-bold text-cyan-400 font-orbitron mb-1">{stat.value}</div>
                <div className="stat-block-label text-gray-300 font-orbitron">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-cyan-950/30 border border-cyan-700/50 rounded-lg p-4 mb-6 max-w-xl">
            <p className="text-cyan-300 font-orbitron text-sm">
              {isRussian
                ? 'Игра находится в активной разработке. Следите за обновлениями!'
                : 'The game is in active development. Stay tuned for updates!'}
            </p>
          </div>

          {/* Newsletter / Follow buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/projects`}
              className="bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 px-8 py-4 text-lg font-orbitron font-bold transition-all hover:text-white"
            >
              {isRussian ? 'ВСЕ ПРОЕКТЫ' : 'ALL PROJECTS'}
            </Link>
          </div>
        </div>
      </section>

      {/* Image Placeholder Section */}
      <section className="py-16 bg-gray-950 border-t border-cyan-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <StaticNoisePlaceholder />
          <p className="text-center text-gray-500 font-mono text-sm mt-4">
            {isRussian ? '[ Визуальные материалы в процессе разработки ]' : '[ Visual assets in development ]'}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-cyan-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron">
            {isRussian ? 'КЛЮЧЕВЫЕ ОСОБЕННОСТИ' : 'KEY FEATURES'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-cyan-800 p-6 hover:bg-cyan-950/20 hover:border-cyan-600 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-cyan-400 flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-orbitron">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 font-rajdhani">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900 border-t border-cyan-900/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-orbitron">
            {isRussian ? 'О ПРОЕКТЕ' : 'ABOUT THE GAME'}
          </h2>
          <p className="text-lg text-gray-300 mb-6 font-rajdhani">
            {isRussian
              ? 'Expedition-418 — настольная ролевая игра о роботах, выполняющих опасные миссии по экстракции. Вас ждёт уникальная система создания персонажей, где каждый робот собирается из модулей и компонентов, и геймплей, сочетающий напряжённые тактические ситуации с моментами неожиданного абсурда.'
              : 'Expedition-418 is a tabletop RPG about robots performing dangerous extraction missions. Experience a unique character creation system where every robot is assembled from modules and components, and gameplay that combines tense tactical situations with moments of unexpected absurdity.'}
          </p>
          <p className="text-lg text-gray-300 mb-8 font-rajdhani">
            {isRussian
              ? 'Играйте быстрые ваншоты или стройте длинные кампании. Ломайтесь, чинитесь, адаптируйтесь.'
              : 'Play quick one-shots or build extended campaigns. Break down, repair, adapt.'}
          </p>

          {/* Easter egg - hidden 418 reference */}
          <div className="mt-12 pt-8 border-t border-cyan-900/20">
            <p className="text-gray-600 font-mono text-xs">
              {isRussian ? 'Код проекта: ' : 'Project code: '}
              <a
                href="https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors cursor-help"
                title={isRussian ? "Почему 418?" : "Why 418?"}
              >
                EXP-418-HTCPCP
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-cyan-900/30 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">
            {isRussian ? 'СЛЕДИТЕ ЗА РАЗРАБОТКОЙ' : 'STAY TUNED'}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-rajdhani">
            {isRussian
              ? 'Игра находится в разработке. Подпишитесь на наши социальные сети, чтобы не пропустить анонсы и плейтесты.'
              : 'The game is in development. Follow our social media to catch announcements and playtests.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/projects`}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-orbitron font-bold transition-colors"
            >
              {isRussian ? 'ДРУГИЕ ПРОЕКТЫ' : 'MORE PROJECTS'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
