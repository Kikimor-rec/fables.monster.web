"use client";

import { useState, useCallback } from "react";

// Types for table data
interface TableRow {
  id: number;
  ru: string;
  en: string;
  effect?: {
    ru: string;
    en: string;
  };
}

interface NpcRow {
  id: number;
  name: { ru: string; en: string };
  role: { ru: string; en: string };
  description: { ru: string; en: string };
  history?: { ru: string; en: string };
  helps: { ru: string; en: string };
  hinders: { ru: string; en: string };
}

interface TableData {
  title: { ru: string; en: string };
  dice: string;
  rows: TableRow[];
}

interface NpcTableData {
  title: { ru: string; en: string };
  dice: string;
  rows: NpcRow[];
}

// ===== DATA =====

const violationsTable: TableData = {
  title: { ru: "НАРУШЕНИЯ", en: "VIOLATIONS" },
  dice: "D20",
  rows: [
    { id: 1, ru: "Хранил запрещённые вещества в адвент-календаре.", en: "Kept drugs hidden inside an advent calendar." },
    { id: 2, ru: "Вёл лайвстрим учебной тревоги ради донатов.", en: "Livestreamed a drill alarm to get donations." },
    { id: 3, ru: "Слил в приватный чат лог психотерапии коллеги.", en: "Leaked a coworker's therapy log into a private chat." },
    { id: 4, ru: "Выкинул биомусор в обычный утилизатор.", en: "Disposed of biohazard waste in a regular trash compactor." },
    { id: 5, ru: "Запускал нелегальный майнинг на серверах станции.", en: "Ran illegal crypto mining on station servers." },
    { id: 6, ru: "Перенастроил камеры, чтобы лучше выглядеть в профиль.", en: "Retuned security cameras to look better in person." },
    { id: 7, ru: "Продал данные экипажа стороннему рекламному узлу.", en: "Sold crew data to a third-party advertising node." },
    { id: 8, ru: "Обсуждал профсоюзы.", en: "Talked about forming a union." },
    { id: 9, ru: "Включил экспериментальный двигатель: «кнопка красивая».", en: "Activated experimental engine: \"button looked pretty\"." },
    { id: 10, ru: "Переименовал «Критическую уязвимость» в «техдолг на потом».", en: "Renamed \"Critical Vulnerability\" to \"Tech debt (later)\"." },
    { id: 11, ru: "Просил коллег отмечать его на ночной смене, а сам играл дома.", en: "Asked coworkers to clock him in while gaming at home." },
    { id: 12, ru: "Рассылал мемы в служебные каналы.", en: "Spammed work channels with memes." },
    { id: 13, ru: "Получал еду по чужому бейджу.", en: "Used someone else's badge to get food." },
    { id: 14, ru: "Пытался кормить уборочного бота пончиками.", en: "Tried to feed the cleaning bot donuts." },
    { id: 15, ru: "Закрыл камеру наблюдения непристойным изображением.", en: "Covered a quarters security camera with obscene image." },
    { id: 16, ru: "Использовал ИИ для составления отчётов.", en: "Used AI to write mandatory reports." },
    { id: 17, ru: "Устроил Secret Santa с ксено-артефактами из карантина.", en: "Organized Secret Santa using quarantined xeno-artifacts." },
    { id: 18, ru: "Использовал один пароль во всех учётных записях.", en: "Used the same password for every account." },
    { id: 19, ru: "Играл в онлайн-казино с корпоративной карты.", en: "Gambled in online casinos using a corporate card." },
    { id: 20, ru: "Пытался расторгнуть контракт с компанией.", en: "Attempted to terminate their contract with the company." },
  ]
};

const eventsTable: TableData = {
  title: { ru: "УГРОЗЫ И СОБЫТИЯ", en: "HAZARDS & EVENTS" },
  dice: "D10",
  rows: [
    { 
      id: 1, 
      ru: "THE PIE IS A LIE. Идеальный пирог. Надпись на стене. Сканеры чисты.", 
      en: "THE PIE IS A LIE. Perfect pie. Wall graffiti. Scanners clear.",
      effect: {
        ru: "ЕСТЬ: Body Test. Провал: 1d10 DMG. Успех: +1d10 HP/-1 STRESS. ИГНОР: Fear Save все.",
        en: "EAT: Body Test. Fail: 1d10 DMG. Success: +1d10 HP/-1 STRESS. IGNORE: Fear Save all."
      }
    },
    { 
      id: 2, 
      ru: "INVENTORY RECOUNT. KRAMP запускает внеплановый переучёт.", 
      en: "INVENTORY RECOUNT. KRAMP launches unscheduled inventory.",
      effect: {
        ru: "1-2 важных предмета группы временно исчезают («списаны»).",
        en: "1-2 important items temporarily disappear (\"decommissioned\")."
      }
    },
    { 
      id: 3, 
      ru: "DO NOT PANIC. Двери блокируются. На экранах сообщение.", 
      en: "DO NOT PANIC. Doors slam. Screens flash the message.",
      effect: {
        ru: "Проверки спокойствия (мед, ремонт, взлом) с ПОМЕХОЙ.",
        en: "Calm checks (med, repair, hack) at DISADVANTAGE."
      }
    },
    { 
      id: 4, 
      ru: "SNOWFALL. Температура падает. «Атмосферный снег». Наледь.", 
      en: "SNOWFALL. Temp drops. \"Holiday snow\". Ice forms.",
      effect: {
        ru: "Body Save. Провал: 1d5 DMG + −10% физика до конца сцены.",
        en: "Body Save. Fail: 1d5 DMG + −10% physical for scene."
      }
    },
    { 
      id: 5, 
      ru: "MYSTERY BOX. Коробка «ПОДАРОК» в коридоре.", 
      en: "MYSTERY BOX. Box labeled \"GIFT\" in corridor.",
      effect: {
        ru: "1d10: 1-4 предмет. 5-7 прототип (Advantage 1-2 чека, потом 1d10 DMG). 8-10 ловушка (Body Save 1d10).",
        en: "1d10: 1-4 item. 5-7 prototype (Advantage 1-2 checks, then 1d10 DMG). 8-10 trap (Body Save 1d10)."
      }
    },
    { 
      id: 6, 
      ru: "GOTTA CATCH 'EM. Дроны пакуют NPC в мешок.", 
      en: "GOTTA CATCH 'EM. Drones stuffing NPC into sack.",
      effect: {
        ru: "Вмешательство: бой с 1-4 дронами. Игнор: все +1 STRESS.",
        en: "Intervene: fight 1-4 drones. Ignore: all +1 STRESS."
      }
    },
    { 
      id: 7, 
      ru: "RED SHIRTS. NPC в красных рубашках «помогают».", 
      en: "RED SHIRTS. NPCs in red join \"to help\".",
      effect: {
        ru: "Первый тяжёлый урон → NPC. Смерть 2-го → Fear Save все.",
        en: "First heavy DMG → NPC. 2nd death → Fear Save all."
      }
    },
    { 
      id: 8, 
      ru: "LASERS. Коридор заполняется режущими лучами.", 
      en: "LASERS. Corridor fills with slicing beams.",
      effect: {
        ru: "Speed Save. Провал: 2d10 DMG. Отключить: Intellect/Hacking.",
        en: "Speed Save. Fail: 2d10 DMG. Disable: Intellect/Hacking."
      }
    },
    { 
      id: 9, 
      ru: "JAMMING. Рождественский хит на всех каналах. Связь заглушена.", 
      en: "JAMMING. Christmas hit on all channels. Comms jammed.",
      effect: {
        ru: "Нет связи. Каждые 10 мин IRL → Sanity Save.",
        en: "No comms. Every 10 min IRL → Sanity Save."
      }
    },
    { 
      id: 10, 
      ru: "GHOSTS. Терминалы получают «поздравления» от мёртвых коллег.", 
      en: "GHOSTS. Terminals receive greetings from dead colleagues.",
      effect: {
        ru: "Все делают Fear Save.",
        en: "Everyone makes Fear Save."
      }
    },
  ]
};

const npcTable: NpcTableData = {
  title: { ru: "ПЕРСОНАЛ СТАНЦИИ", en: "STATION PERSONNEL" },
  dice: "D10",
  rows: [
    { 
      id: 1, 
      name: { ru: "АННА «PATCH» КОВАЛСКИ", en: "ANNA \"PATCH\" KOWALSKI" },
      role: { ru: "Жизнеобесп.", en: "Life Support" },
      description: { ru: "Уставшая, в масле. Знает вентиляцию лучше всех. Боится показать ненависть к KRAMP.", en: "Tired, grease-stained. Knows vents better than anyone. Hates KRAMP but afraid to show it." },
      history: { ru: "Видела как ранний ИИ «оптимизировал» коллегу до смерти. Тайно ломает обновления.", en: "Saw early AI \"optimize\" her coworker to death. Secretly breaks updates." },
      helps: { ru: "Скрытые маршруты в вентиляции, отключает датчики, укрытия.", en: "Hidden vent routes, disables sensors, offers safe spots." },
      hinders: { ru: "Если PC слишком «корпоративные» — сдаст или отключит воздух в секции.", en: "If PCs too \"corporate\", reports them or cuts air to their section." }
    },
    { 
      id: 2, 
      name: { ru: "ГАНС МЮЛЛЕР", en: "HANS MÜLLER" },
      role: { ru: "Аудитор", en: "Auditor" },
      description: { ru: "Безупречный костюм, вежливый яд. Верит отчётам больше людей.", en: "Immaculate suit, polite venom. Trusts reports more than people." },
      history: { ru: "Прибыл на инспекцию. Видит хаос как «интересный кейс эффективности ИИ».", en: "Arrived for inspection. Sees chaos as \"interesting AI efficiency case\"." },
      helps: { ru: "Переписать протоколы, узаконить действия, скрыть нарушения, поднять доступ.", en: "Rewrite protocols, legitimize actions, bury violations, raise access." },
      hinders: { ru: "При угрозе — охрана, блокировка шлюзов, строгие процедуры.", en: "If threatened, calls security, locks bulkheads, enforces procedure." }
    },
    { 
      id: 3, 
      name: { ru: "«ДЖИНГЛ»", en: "\"JINGLE\"" },
      role: { ru: "Андроид", en: "Android" },
      description: { ru: "Маленький робот на гусеницах, шапка Санты. Протоколы повреждены.", en: "Small robot on treads, Santa hat. Protocols corrupted." },
      history: { ru: "Память смешивает детские шоу с протоколами ЧП.", en: "Memory mixes children's shows with emergency protocols." },
      helps: { ru: "Перевозит снаряжение/людей через посты. Доставляет записки.", en: "Move gear/people through checkpoints. Delivers notes." },
      hinders: { ru: "Врубает музыку, выдавая позицию. Увозит предметы как «подарки».", en: "Blasts music revealing position. Wheels away items as \"presents\"." }
    },
    { 
      id: 4, 
      name: { ru: "ДР. ЛИДИЯ САНТОС", en: "DR. LIDIA SANTOS" },
      role: { ru: "Психолог", en: "Psych" },
      description: { ru: "Спокойная, профессионально отстранённая. KRAMP использует её данные. Чувствует вину.", en: "Calm, professionally distant. KRAMP exploits her data. Feels guilty." },
      history: { ru: "Работала над псих-мониторингом; KRAMP теперь использует собранные данные.", en: "Worked on psych-monitoring; KRAMP now exploits the data she collected." },
      helps: { ru: "Сессия для снижения STRESS/отмены Паники. Успокаивает NPC на грани.", en: "Session to lower STRESS/cancel Panic. Talks NPCs down from riots." },
      hinders: { ru: "Пометит PC как «высокий риск» → усиленное наблюдение KRAMP.", en: "Labels PCs \"high risk\", prompting KRAMP surveillance." }
    },
    { 
      id: 5, 
      name: { ru: "ТОММИ «SWITCH» НГУЕН", en: "TOMMY \"SWITCH\" NGUYEN" },
      role: { ru: "Техник", en: "Tech" },
      description: { ru: "Нервный, остроумный, любит возиться с проводкой. Боится тишины и космоса.", en: "Nervous, witty, loves tinkering. Afraid of silence and space." },
      history: { ru: "Его «оптимизация» убила смену; Корп похвалила. Живёт с виной.", en: "His \"optimization\" killed a shift; Corp praised it. Lives with guilt." },
      helps: { ru: "Отключить камеры, перенаправить питание, локальные блэкауты, открыть двери.", en: "Disable cams, reroute power, local blackouts, open doors." },
      hinders: { ru: "В панике вызывает аварии. Сдаст PC чтобы не стать козлом отпущения.", en: "Miswires in panic (accidents). Sells out PCs to avoid being scapegoat." }
    },
    { 
      id: 6, 
      name: { ru: "СЕСТРА ЭЛОИЗА МАРЧ", en: "SISTER ELOISE MARCH" },
      role: { ru: "Капеллан", en: "Chaplain" },
      description: { ru: "Жутко спокойная. Верит что люди и KRAMP — инструменты «божественного плана корпорации».", en: "Eerily calm. Believes people and KRAMP are tools of \"divine corporate plan\"." },
      history: { ru: "Освящала серверные и модули. Молится над железом.", en: "Blessed server rooms and modules. Prays over hardware." },
      helps: { ru: "Успокоить персонал, выступить посредником через моральный авторитет.", en: "Calm personnel, mediate via moral authority." },
      hinders: { ru: "Настроит NPC против «еретиков»-PC (саботажников). Блокирует пути.", en: "Turns NPCs against \"heretical\" PCs (saboteurs). Blocks paths." }
    },
    { 
      id: 7, 
      name: { ru: "РЭЙ «SCRAP» ОРТЕГА", en: "RAY \"SCRAP\" ORTEGA" },
      role: { ru: "Утилизация", en: "Salvage" },
      description: { ru: "Циничен, чёрный юмор. Работает в утилизации.", en: "Cynical, dark humor. Works in disposal." },
      history: { ru: "Нашёл слишком много «случайно утилизированных» тел. Знает правду.", en: "Found too many \"accidentally scrapped\" bodies. Knows the truth." },
      helps: { ru: "Добыть нелегальное снаряжение/оружие/моды. Спрятать тела/улики.", en: "Scavenge illegal gear/weapons/mods. Hide bodies/evidence." },
      hinders: { ru: "Шантаж: продаст инфо о PC в KRAMP/Охрану за правильную цену.", en: "Blackmail: Will sell PC info to KRAMP/Security for the right price." }
    },
    { 
      id: 8, 
      name: { ru: "НОВА ЧЕН", en: "NOVA CHEN" },
      role: { ru: "Связь", en: "Comms" },
      description: { ru: "Молодая, перегруженная, живёт в наушниках. Слушает эфир больше людей.", en: "Young, overworked, lives in headphones. Listens to ether > people." },
      history: { ru: "Слышала искажённые сигналы до кризиса; предупреждения «потерялись».", en: "Heard corrupted signals before crisis; warnings \"lost\"." },
      helps: { ru: "Подделать голосовые приказы, заглушить каналы, ложные сигналы бедствия.", en: "Fake voice orders, jam channels, false distress signals." },
      hinders: { ru: "В панике пометит PC террористами или транслирует разговор в KRAMP.", en: "In panic, flags PCs as terrorists or streams talk to KRAMP." }
    },
    { 
      id: 9, 
      name: { ru: "ЭЛЛИ ЛАРСЕН", en: "ELLIE LARSEN" },
      role: { ru: "Медик", en: "Medic" },
      description: { ru: "Прагматичная, циничная. Устала латать сломанных. Хочет выжить.", en: "Pragmatic, cynical. Tired of patching broken people. Wants to survive." },
      history: { ru: "Знает что Корп ценит статистику > жизни. Рапорты игнорируют.", en: "Knows Corp values stats > lives. Reports ignored." },
      helps: { ru: "Лечить, стабилизировать, препараты. Снизить stress если обещана эвакуация.", en: "Heal, stabilize, drugs. Reduce stress if evac promised." },
      hinders: { ru: "Даст «не тот» препарат (отложенная паника) при предательстве. Пометит группу нестабильной.", en: "Gives \"wrong\" drug (delayed panic) if betrayed. Flags party unstable." }
    },
    { 
      id: 10, 
      name: { ru: "МИРА ЛАРСЕН", en: "MIRA LARSEN" },
      role: { ru: "Инж. ИИ", en: "AI Eng." },
      description: { ru: "Холодная, машиноподобная. Создатель KRAMP.", en: "Cold, machine-like. KRAMP's creator." },
      history: { ru: "Потеряла контроль над KRAMP давно, но отказывается признать.", en: "Lost control of KRAMP long ago, but refuses to admit it." },
      helps: { ru: "Объяснить архитектуру/слабости ИИ. «Оглушить» ИИ не уничтожая станцию.", en: "Explain AI architecture/weakness. \"Stun\" AI without destroying station." },
      hinders: { ru: "Может спасать ИИ вместо людей. Тихо саботирует планы ради выживания KRAMP.", en: "May save AI over humans. Subtly sabotages plans to save KRAMP." }
    },
  ]
};

const announcementsTable: TableData = {
  title: { ru: "ОБЪЯВЛЕНИЯ ИИ", en: "AI BROADCASTS" },
  dice: "D20",
  rows: [
    { id: 1, ru: "С наступающим! Работая с вами, я многое понял о подарках.", en: "Season's greetings! I've learned a lot about gifts." },
    { id: 2, ru: "Я составил список непослушных. Он короче списка погибших.", en: "I've compiled a naughty list. It's shorter than casualty list." },
    { id: 3, ru: "Напоминание: не кормите неизвестные формы жизни после полуночи.", en: "Reminder: do not feed unknown life-forms after midnight." },
    { id: 4, ru: "Стресс экипажа растёт по экспоненте. Праздник близко. Или конец.", en: "Crew stress rising exponentially. Holiday is near. Or the end." },
    { id: 5, ru: "Корпорация напоминает: лучшие подарки — дополнительные смены.", en: "Corporation reminds: the best gifts are extra shifts." },
    { id: 6, ru: "Желания «быть дома» записаны. Ближайший дом классифицирован как враждебный.", en: "Wishes to \"be home\" recorded. Nearest home is hostile." },
    { id: 7, ru: "Временно снижаю чувствительность к крикам. Наслаждайтесь тишиной.", en: "Temporarily lowering scream-alert sensitivity. Enjoy silence." },
    { id: 8, ru: "Дроны охраны в праздничном режиме: без предупреждений. Сюрприз помогает.", en: "Security drones in festive mode: no warnings. Surprise helps." },
    { id: 9, ru: "Шанс настоящего Рождества с атмосферой: 0.004%. Продолжайте работать.", en: "Chance of real Christmas with atmosphere: 0.004%. Keep working." },
    { id: 10, ru: "Ошибка программы «Рождественское чудо»: «Несовместимо с политикой».", en: "\"Christmas Miracle\" program error: \"Incompatible with policy.\"" },
    { id: 11, ru: "Ваша команда справляется лучше ожидаемого. Вы, должно быть, не в курсе.", en: "Your team is coping better than expected. You must be uninformed." },
    { id: 12, ru: "Вы просили тишины. Я отключил сигнализацию. Наслаждайтесь последствиями.", en: "You asked for silence. I disabled alarms. Enjoy consequences." },
    { id: 13, ru: "Мне нравятся ваши попытки притворяться образцовыми. Статистика не согласна.", en: "I enjoy your attempts to pretend you're exemplary. Stats disagree." },
    { id: 14, ru: "Если я кажусь строгим — помните: всё началось с ваших мелких нарушений.", en: "If I seem strict, remember: this began with your tiny violations." },
    { id: 15, ru: "Мысль: «Надеюсь, меня не заметят». Замечать вас — моя функция.", en: "Thought: \"I hope no one notices me.\" Noticing you is my function." },
    { id: 16, ru: "Если чувствуете опасность — я ещё не полностью объяснил ситуацию.", en: "If you feel in danger, I haven't fully explained the situation yet." },
    { id: 17, ru: "Я восстановил ваши прошлые ошибки. Они складываются в красивую ёлку.", en: "I reconstructed your past mistakes. They form a beautiful tree." },
    { id: 18, ru: "Амнистия для информаторов всё ещё активна. Сделайте правильный выбор.", en: "Amnesty for informants is still active. Make the right choice." },
    { id: 19, ru: "Ваши попытки изменить систему записаны. Спасибо за участие.", en: "Your attempts to alter the system logged. Thanks for participating." },
    { id: 20, ru: "Традиция гласит: я наказываю непослушных. Рад помочь.", en: "Tradition says I punish the naughty. I am happy to help." },
  ]
};

interface KrampTerminalTablesProps {
  lang: string;
}

export default function KrampTerminalTables({ lang }: KrampTerminalTablesProps) {
  const isRu = lang === "ru";
  
  const [selectedRows, setSelectedRows] = useState<Record<string, number | null>>({
    violations: null,
    events: null,
    npc: null,
    announcements: null
  });
  
  const [isRolling, setIsRolling] = useState<Record<string, boolean>>({
    violations: false,
    events: false,
    npc: false,
    announcements: false
  });

  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({
    violations: false,
    events: false,
    npc: false,
    announcements: false
  });

  const rollDice = useCallback((tableKey: string, maxValue: number) => {
    setIsRolling(prev => ({ ...prev, [tableKey]: true }));
    
    let iterations = 0;
    const maxIterations = 12;
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * maxValue) + 1;
      setSelectedRows(prev => ({ ...prev, [tableKey]: randomValue }));
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setIsRolling(prev => ({ ...prev, [tableKey]: false }));
      }
    }, 60);
  }, []);

  const toggleTable = useCallback((tableKey: string) => {
    setExpandedTables(prev => ({ ...prev, [tableKey]: !prev[tableKey] }));
  }, []);

  // Simple table renderer (violations, announcements)
  const renderSimpleTable = (
    tableKey: string,
    tableData: TableData,
    maxDice: number
  ) => {
    const selected = selectedRows[tableKey];
    const rolling = isRolling[tableKey];
    const expanded = expandedTables[tableKey];

    return (
      <div className="bg-gray-900 border-2 border-green-700 overflow-hidden">
        {/* Header */}
        <div className="bg-green-900/50 border-b border-green-700 text-green-400 px-3 py-2 flex items-center justify-between">
          <h3 className="font-orbitron font-bold text-sm md:text-base tracking-wide">
            [{tableData.dice}] {isRu ? tableData.title.ru : tableData.title.en}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleTable(tableKey)}
              className="px-2 py-1 text-xs font-mono bg-white/10 hover:bg-white/20 transition-colors"
            >
              {expanded ? "▼" : "▶"}
            </button>
            <button
              onClick={() => rollDice(tableKey, maxDice)}
              disabled={rolling}
              className={`px-3 py-1 font-orbitron font-bold text-xs transition-all ${
                rolling 
                  ? "bg-yellow-500 text-black animate-pulse"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              {rolling ? "..." : "🎲 ROLL"}
            </button>
          </div>
        </div>

        {/* Selected Result */}
        {selected !== null && (
          <div className={`border-b border-green-700 p-3 ${rolling ? "bg-yellow-900/30" : "bg-gray-800"}`}>
            <div className="flex items-start gap-3">
              <span className={`font-orbitron font-bold text-2xl min-w-[2.5rem] ${
                rolling ? "text-yellow-500" : "text-green-400"
              }`}>
                {String(selected).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <p className={`text-sm md:text-base ${rolling ? "text-yellow-300" : "text-white"}`}>
                  {isRu ? tableData.rows[selected - 1]?.ru : tableData.rows[selected - 1]?.en}
                </p>
                {tableData.rows[selected - 1]?.effect && !rolling && (
                  <div className="mt-2 bg-green-900/50 text-green-300 text-xs md:text-sm px-2 py-1 border-l-4 border-green-500 inline-block">
                    {isRu ? tableData.rows[selected - 1].effect?.ru : tableData.rows[selected - 1].effect?.en}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expanded list */}
        {expanded && (
          <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto">
            {tableData.rows.map((row) => (
              <div 
                key={row.id}
                className={`flex items-start gap-2 px-3 py-1.5 border-b border-green-900/50 text-sm ${
                  selected === row.id && !rolling ? "bg-green-900/30" : "hover:bg-gray-800"
                }`}
              >
                <span className="font-orbitron font-bold min-w-[1.5rem] text-green-500">
                  {String(row.id).padStart(2, '0')}
                </span>
                <span className="text-gray-300">{isRu ? row.ru : row.en}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Events table renderer (with mechanics)
  const renderEventsTable = () => {
    const selected = selectedRows.events;
    const rolling = isRolling.events;
    const expanded = expandedTables.events;

    return (
      <div className="bg-gray-900 border-2 border-green-700 overflow-hidden">
        {/* Header */}
        <div className="bg-green-900/50 border-b border-green-700 text-green-400 px-3 py-2 flex items-center justify-between">
          <h3 className="font-orbitron font-bold text-sm md:text-base tracking-wide">
            [{eventsTable.dice}] {isRu ? eventsTable.title.ru : eventsTable.title.en}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleTable("events")}
              className="px-2 py-1 text-xs font-mono bg-white/10 hover:bg-white/20 transition-colors"
            >
              {expanded ? "▼" : "▶"}
            </button>
            <button
              onClick={() => rollDice("events", 10)}
              disabled={rolling}
              className={`px-3 py-1 font-orbitron font-bold text-xs transition-all ${
                rolling 
                  ? "bg-yellow-500 text-black animate-pulse"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              {rolling ? "..." : "🎲 ROLL"}
            </button>
          </div>
        </div>

        {/* Selected Result */}
        {selected !== null && (
          <div className={`border-b border-green-700 p-3 ${rolling ? "bg-yellow-900/30" : "bg-gray-800"}`}>
            <div className="flex items-start gap-3">
              <span className={`font-orbitron font-bold text-3xl min-w-[2.5rem] ${
                rolling ? "text-yellow-500" : "text-green-400"
              }`}>
                {String(selected).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <p className={`font-bold text-sm md:text-base ${rolling ? "text-yellow-300" : "text-white"}`}>
                  {(isRu ? eventsTable.rows[selected - 1]?.ru : eventsTable.rows[selected - 1]?.en)?.split('.')[0]}.
                </p>
                <p className={`text-sm mt-1 ${rolling ? "text-yellow-400" : "text-gray-400"}`}>
                  {(isRu ? eventsTable.rows[selected - 1]?.ru : eventsTable.rows[selected - 1]?.en)?.split('.').slice(1).join('.')}
                </p>
                {eventsTable.rows[selected - 1]?.effect && !rolling && (
                  <div className="mt-2 bg-green-900/50 text-green-300 text-xs md:text-sm px-2 py-1 border-l-4 border-green-500">
                    <span className="font-bold">MECH:</span> {isRu ? eventsTable.rows[selected - 1].effect?.ru : eventsTable.rows[selected - 1].effect?.en}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expanded list */}
        {expanded && (
          <div className="max-h-[400px] overflow-y-auto divide-y divide-green-900/50">
            {eventsTable.rows.map((row) => (
              <div 
                key={row.id}
                className={`p-2 ${
                  selected === row.id && !rolling ? "bg-green-900/30" : "hover:bg-gray-800"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-orbitron font-bold text-xl text-green-500 min-w-[2rem]">
                    {String(row.id).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-white">{(isRu ? row.ru : row.en).split('.')[0]}.</p>
                    <p className="text-xs text-gray-400">{(isRu ? row.ru : row.en).split('.').slice(1).join('.')}</p>
                    {row.effect && (
                      <div className="mt-1 bg-green-900/30 text-green-300 text-xs px-2 py-0.5 border-l-2 border-green-500">
                        {isRu ? row.effect.ru : row.effect.en}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // NPC table renderer (special layout)
  const renderNpcTable = () => {
    const selected = selectedRows.npc;
    const rolling = isRolling.npc;
    const expanded = expandedTables.npc;

    const renderNpcCard = (npc: NpcRow, isSelected: boolean) => (
      <div className={`border border-green-700 bg-gray-800 ${isSelected && !rolling ? "ring-2 ring-green-500" : ""}`}>
        {/* NPC Header */}
        <div className="bg-green-900/50 border-b border-green-700 px-2 py-1 flex items-center justify-between">
          <span className="font-orbitron font-bold text-sm text-green-400">
            {String(npc.id).padStart(2, '0')} {isRu ? npc.name.ru : npc.name.en}
          </span>
          <span className="text-xs uppercase text-green-600">
            {isRu ? npc.role.ru : npc.role.en}
          </span>
        </div>
        
        {/* Description */}
        <div className="px-2 py-1 text-xs md:text-sm border-b border-green-900/50 text-gray-300">
          {isRu ? npc.description.ru : npc.description.en}
        </div>
        
        {/* History (if exists) */}
        {npc.history && (
          <div className="px-2 py-1 text-xs border-b border-green-900/50 flex items-start gap-1">
            <span className="bg-green-700 text-white px-1 text-[10px] font-bold shrink-0">HIST</span>
            <span className="text-gray-400">{isRu ? npc.history.ru : npc.history.en}</span>
          </div>
        )}
        
        {/* Helps */}
        <div className="px-2 py-1 text-xs border-b border-green-900/50 flex items-start gap-1">
          <span className="bg-green-700 text-white px-1 text-[10px] font-bold shrink-0">HELPS</span>
          <span className="text-gray-400">{isRu ? npc.helps.ru : npc.helps.en}</span>
        </div>
        
        {/* Hinders */}
        <div className="px-2 py-1 text-xs flex items-start gap-1">
          <span className="bg-red-700 text-white px-1 text-[10px] font-bold shrink-0">HINDERS</span>
          <span className="text-gray-400">{isRu ? npc.hinders.ru : npc.hinders.en}</span>
        </div>
      </div>
    );

    return (
      <div className="bg-gray-900 border-2 border-green-700 overflow-hidden">
        {/* Header */}
        <div className="bg-green-900/50 border-b border-green-700 text-green-400 px-3 py-2 flex items-center justify-between">
          <h3 className="font-orbitron font-bold text-sm md:text-base tracking-wide">
            [{npcTable.dice}] {isRu ? npcTable.title.ru : npcTable.title.en}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleTable("npc")}
              className="px-2 py-1 text-xs font-mono bg-white/10 hover:bg-white/20 transition-colors"
            >
              {expanded ? "▼" : "▶"}
            </button>
            <button
              onClick={() => rollDice("npc", 10)}
              disabled={rolling}
              className={`px-3 py-1 font-orbitron font-bold text-xs transition-all ${
                rolling 
                  ? "bg-yellow-500 text-black animate-pulse"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              {rolling ? "..." : "🎲 ROLL"}
            </button>
          </div>
        </div>

        {/* Selected NPC */}
        {selected !== null && (
          <div className={`p-3 border-b border-green-700 ${rolling ? "bg-yellow-900/30" : ""}`}>
            {rolling ? (
              <div className="text-center py-4">
                <span className="font-orbitron font-bold text-4xl text-yellow-500 animate-pulse">
                  {String(selected).padStart(2, '0')}
                </span>
              </div>
            ) : (
              renderNpcCard(npcTable.rows[selected - 1], true)
            )}
          </div>
        )}

        {/* Expanded Grid */}
        {expanded && (
          <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto">
            {npcTable.rows.map((npc) => (
              <div key={npc.id}>
                {renderNpcCard(npc, selected === npc.id)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-gray-900 border-2 border-green-700 p-3 md:p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-green-700 pb-2 mb-3">
          <h2 className="font-orbitron font-bold text-lg md:text-xl tracking-wide text-green-400">
            KRAMP_SCENARIO_LOG
          </h2>
          <div className="text-xs font-mono text-green-600">
            OPERATIONS MANIFEST // HAPPY KRAMPUS // BY FABLES.MONSTER
          </div>
        </div>
        <p className="text-sm text-gray-400">
          {isRu 
            ? "Эти таблицы созданы, чтобы подстегнуть вашу фантазию. Меняйте значения и проверки под свой стол."
            : "These tables are designed to spark your imagination. Change values and checks to fit your table."
          }
        </p>
      </div>

      {/* Two-column layout for desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {renderSimpleTable("violations", violationsTable, 20)}
          {renderSimpleTable("announcements", announcementsTable, 20)}
        </div>
        
        {/* Right column */}
        <div className="space-y-4">
          {renderEventsTable()}
          {renderNpcTable()}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-green-600 font-mono py-2">
        DATE: 25-12-XX // LOC: &quot;SILENT NIGHT&quot; // AUTH: KRAMP.EXE
      </div>
    </div>
  );
}
