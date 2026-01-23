import { Metadata } from "next";
import Link from 'next/link';
import { getContent, getFrontmatterString } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import StayConnectedSection from "@/components/StayConnectedSection";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = await getContent('projects', 'expedition-418', lang);
  const title = content ? getFrontmatterString(content.frontmatter, 'title') : '';
  const tagline = content ? getFrontmatterString(content.frontmatter, 'tagline') : '';

  return {
    title: `${title || 'Expedition-418'} - Extraction TTRPG | Fables Monster Studio`,
    description: tagline || 'An extraction TTRPG about robots on missions that matter.',
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

// Static noise placeholder component with ERR_418 easter egg
function StaticNoisePlaceholder({ isRussian }: { isRussian: boolean }) {
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

      {/* Center text with glitch */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-cyan-400 font-mono text-sm mb-2 glitch-text-fast opacity-70" data-text={isRussian ? "СИГНАЛ ПОТЕРЯН" : "SIGNAL LOST"}>
          {isRussian ? "СИГНАЛ ПОТЕРЯН" : "SIGNAL LOST"}
        </div>
        <div className="text-cyan-500 font-orbitron text-xl md:text-3xl font-bold tracking-wider static-text-flicker mb-2">
          {isRussian ? "ВИЗУАЛЬНЫЙ КАНАЛ ОФФЛАЙН" : "VISUAL FEED OFFLINE"}
        </div>
        <a
          href="https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 font-mono text-xs mt-4 opacity-80 hover:opacity-100 hover:text-red-400 transition-opacity cursor-help glitch-text-fast"
          data-text={isRussian ? "[ ERR_418: ЮНИТ ЯВЛЯЕТСЯ ЧАЙНИКОМ ]" : "[ ERR_418: UNIT IS A TEAPOT ]"}
          title={isRussian ? "Что это значит?" : "What does this mean?"}
        >
          {isRussian ? "[ ERR_418: ЮНИТ ЯВЛЯЕТСЯ ЧАЙНИКОМ ]" : "[ ERR_418: UNIT IS A TEAPOT ]"}
        </a>
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
  const homeDict = await getDictionary(lang, 'home');

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
      title: isRussian ? "Собери своего бота" : "Build Your Bot",
      description: isRussian
        ? "Начни с шасси. Выбери корпус. Навесь манипуляторы. Настрой сенсоры. Одинаковых сборок не бывает."
        : "Start with a chassis. Pick a frame. Attach manipulators. Calibrate sensors. No two builds are the same.",
      icon: FeatureIcons.robot
    },
    {
      title: isRussian ? "Extraction-цикл" : "Extraction Loop",
      description: isRussian
        ? "Высадка. Цель. Эвакуация. На брифинге всё просто — пока кто-то не застрял в яме, или не показал неудачно фокус."
        : "Drop. Target. Extract. Briefing makes it sound simple — until someone gets stuck in a pit, or a trick goes sideways.",
      icon: FeatureIcons.extraction
    },
    {
      title: isRussian ? "Сессии на твой вкус" : "Sessions Your Way",
      description: isRussian
        ? "Двухчасовые вылазки или месячные кампании. Персонажи меняются, ломаются и пересобираются."
        : "Two-hour runs or month-long campaigns. Characters change, break down, get rebuilt.",
      icon: FeatureIcons.campaign
    },
    {
      title: isRussian ? "Контролируемый хаос" : "Controlled Chaos",
      description: isRussian
        ? "Переговоры со взбунтовавшимся ИИ. Маршрут по рушащемуся объекту. Спор, кто виноват. Будет напряжённо — и абсурдно ровно настолько, насколько опасно."
        : "Negotiations with a rogue AI. Routes through collapsing facilities. Arguments about whose fault it was. Tense — and exactly as absurd as it is dangerous.",
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
          {/* Status badge with glitch */}
          <div className="mb-6">
            <span className="px-4 py-2 bg-cyan-900/50 border border-cyan-500 text-cyan-400 font-orbitron text-sm tracking-wider glitch-text-fast" data-text={isRussian ? "В РАЗРАБОТКЕ" : "IN DEVELOPMENT"}>
              {isRussian ? "В РАЗРАБОТКЕ" : "IN DEVELOPMENT"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 font-orbitron tracking-wider glitch-text" data-text={contentTitle || 'EXPEDITION-418'}>
            {contentTitle || 'EXPEDITION-418'}
          </h1>

          <p className="text-lg md:text-xl text-cyan-400 mb-6 font-orbitron tracking-wide">
            {contentSubtitle || (isRussian ? 'Extraction-НРИ о роботах' : 'Extraction TTRPG About Robots')}
          </p>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-rajdhani">
            {contentTagline || (isRussian
              ? 'Роботы разных конфигураций на миссиях, которые действительно важны. Собери бота. Выполни задачу. Постарайся вернуться.'
              : 'Robots of various configurations on missions that actually matter. Build your bot. Complete the objective. Try to make it back.')}
          </p>

          {/* Stats Grid with hover glitch */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-3xl mx-auto w-full">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/60 border border-cyan-700 stat-block p-2 sm:p-3 hover:border-cyan-500 transition-colors group">
                <div className="text-lg sm:text-2xl font-bold text-cyan-400 font-orbitron mb-1 group-hover:glitch-text-fast" data-text={stat.value}>{stat.value}</div>
                <div className="stat-block-label text-gray-300 font-orbitron">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-cyan-950/30 border border-cyan-700/50 rounded-lg p-4 mb-6 max-w-xl">
            <p className="text-cyan-300 font-mono text-sm">
              {isRussian
                ? '> Игра в активной разработке. Следите за обновлениями_'
                : '> Game in active development. Stay tuned for updates_'}
            </p>
          </div>

          {/* Follow buttons */}
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
          <StaticNoisePlaceholder isRussian={isRussian} />
          <p className="text-center text-gray-500 font-mono text-sm mt-4">
            {isRussian ? '[ Визуальные материалы в процессе загрузки... ]' : '[ Visual assets loading... ]'}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-cyan-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron glitch-text" data-text={isRussian ? 'СИСТЕМЫ' : 'SYSTEMS'}>
            {isRussian ? 'СИСТЕМЫ' : 'SYSTEMS'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-cyan-800 p-6 hover:bg-cyan-950/20 hover:border-cyan-600 transition-colors group"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-cyan-400 flex-shrink-0 group-hover:animate-pulse">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-orbitron group-hover:text-cyan-400 transition-colors">
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
            {isRussian ? 'О ПРОЕКТЕ' : 'ABOUT'}
          </h2>
          <p className="text-lg text-gray-300 mb-6 font-rajdhani">
            {isRussian
              ? 'Expedition-418 — настольная ролевая игра про роботов на опасных миссиях. Вы собираете робота из деталей: шасси, корпус, манипуляторы, сенсорные массивы, вычислительное ядро. Каждая сборка — со своими плюсами и слабостями, и каждая миссия проверяет их на прочность.'
              : 'Expedition-418 is a tabletop RPG about robots on dangerous missions. You build your robot from parts: chassis, frame, manipulators, sensor arrays, processing core. Every build has its strengths and weaknesses, and every mission tests them.'}
          </p>
          <p className="text-lg text-gray-300 mb-4 font-rajdhani">
            {isRussian
              ? 'Основа игры — extraction-цикл: войти, выполнить задачу, выбраться до того, как всё начнёт рушиться. Обычно рушится всё равно.'
              : 'The core of the game is the extraction loop: get in, complete the objective, get out before everything starts falling apart. It usually falls apart anyway.'}
          </p>
          <p className="text-lg text-gray-300 mb-8 font-rajdhani">
            {isRussian
              ? 'Играйте короткие ваншоты или ведите долгие кампании. Ломайся, чинись, адаптируйся.'
              : 'Play quick one-shots or run extended campaigns. Break down, repair, adapt.'}
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

      {/* Stay Connected Section */}
      <StayConnectedSection
        lang={lang}
        dict={homeDict.stayConnected}
        variant="cyberpunk"
      />
    </div>
  );
}
