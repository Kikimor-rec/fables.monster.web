interface CareerTwilightStatsProps {
  dict: {
    stats: {
      title: string;
      players: string;
      playersValue: string;
      hours: string;
      hoursValue: string;
      system: string;
      systemValue: string;
      format: string;
      formatValue: string;
    };
    intro: {
      credit: string;
      editor: string;
    };
  };
}

export default function CareerTwilightStats({ dict }: CareerTwilightStatsProps) {
  const stats = [
    { label: dict.stats.players, value: dict.stats.playersValue },
    { label: dict.stats.hours, value: dict.stats.hoursValue },
    { label: dict.stats.system, value: dict.stats.systemValue },
    { label: dict.stats.format, value: dict.stats.formatValue },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-orbitron text-lg tracking-[0.15em] text-cyan-400/80 mb-8 text-center">
          {dict.stats.title}
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center border border-cyan-500/20 bg-cyan-500/5 px-4 py-4"
            >
              <p className="text-2xl md:text-3xl font-bold font-orbitron text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-mono text-cyan-400/60 tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Credits */}
        <div className="text-center text-sm text-gray-500 font-mono space-y-1">
          <p dangerouslySetInnerHTML={{ __html: dict.intro.credit }} />
          <p>{dict.intro.editor}</p>
        </div>
      </div>
    </section>
  );
}
