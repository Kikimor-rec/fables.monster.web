interface FileItem {
  label: string;
  text: string;
}

interface CreditItem {
  label: string;
  value: string;
}

interface CareerTwilightReleaseProps {
  dict: {
    release: {
      licenseLabel: string;
      licenseText: string;
      licenseLinkText: string;
      missionTitle: string;
      missionText: string;
      statusTitle: string;
      statusText: string;
      manifestLabel: string;
      manifestTitle: string;
      manifestText: string;
      files: FileItem[];
      featuresLabel: string;
      featuresTitle: string;
      features: string[];
      updateLabel: string;
      updateTitle: string;
      updateText: string[];
      wardenLabel: string;
      wardenText: string;
      warningLabel: string;
      warningText: string;
      creditsTitle: string;
      credits: CreditItem[];
      legal: string;
    };
  };
}

export default function CareerTwilightRelease({ dict }: CareerTwilightReleaseProps) {
  const release = dict.release;
  const primaryFiles = release.files.slice(0, 3);
  const supportFiles = release.files.slice(3);

  return (
    <section className="border-b border-cyan-500/20 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 border border-cyan-500/25 bg-black/40">
          <div className="border-b border-cyan-500/25 bg-cyan-500/10 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyan-300">
            {release.licenseLabel}
          </div>
          <p className="px-4 py-3 text-xs leading-relaxed text-gray-400 md:text-sm">
            {release.licenseText}{" "}
            <a
              href="https://www.tuesdayknightgames.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
            >
              {release.licenseLinkText}
            </a>
            .
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5">
            <article className="border border-cyan-500/20 bg-cyan-500/5 p-5 md:p-6">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/70">
                {release.featuresLabel}
              </p>
              <h2 className="mb-4 font-orbitron text-2xl uppercase tracking-[0.1em] text-white">
                {release.featuresTitle}
              </h2>
              <ul className="grid gap-2 text-sm leading-relaxed text-gray-300 md:grid-cols-2">
                {release.features.map((feature) => (
                  <li key={feature} className="border-l-2 border-cyan-500/45 bg-black/20 px-3 py-2">
                    {feature}
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="border border-cyan-500/20 bg-black/35 p-5">
                <h2 className="mb-3 font-orbitron text-lg uppercase tracking-[0.12em] text-cyan-200">
                  {release.missionTitle}
                </h2>
                <p className="text-sm leading-relaxed text-gray-300">{release.missionText}</p>
              </article>
              <article className="border border-red-500/25 bg-red-950/20 p-5">
                <h2 className="mb-3 font-orbitron text-lg uppercase tracking-[0.12em] text-red-200">
                  {release.statusTitle}
                </h2>
                <p className="text-sm leading-relaxed text-gray-300">{release.statusText}</p>
              </article>
            </div>
          </div>

          <aside className="border border-blue-500/25 bg-blue-950/20 p-5 md:p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-blue-300/80">
              {release.manifestLabel}
            </p>
            <h2 className="mb-3 font-orbitron text-xl uppercase tracking-[0.1em] text-blue-100">
              {release.manifestTitle}
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-gray-300">{release.manifestText}</p>
            <div className="grid gap-3">
              {primaryFiles.map((file) => (
                <div
                  key={file.label}
                  className="border border-cyan-500/20 bg-black/35 px-4 py-3 text-sm text-gray-300"
                >
                  <strong className="block font-mono text-xs uppercase tracking-[0.16em] text-cyan-200">
                    {file.label}
                  </strong>
                  <span>{file.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {supportFiles.map((file) => (
                <div
                  key={file.label}
                  className="border border-cyan-500/15 bg-black/25 px-3 py-2 text-xs text-gray-300"
                >
                  <strong className="font-mono uppercase text-cyan-200">{file.label}</strong>{" "}
                  {file.text}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
            <article className="border border-cyan-500/20 bg-cyan-950/15 p-5">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/70">
                {release.updateLabel}
              </p>
              <h2 className="mb-4 font-orbitron text-lg uppercase tracking-[0.1em] text-white">
                {release.updateTitle}
              </h2>
              <div className="space-y-2 text-sm leading-relaxed text-gray-300">
                {release.updateText.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
              <article className="border border-yellow-500/25 bg-yellow-950/15 p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-yellow-300/80">
                  {release.wardenLabel}
                </p>
                <p className="text-sm leading-relaxed text-gray-300">{release.wardenText}</p>
              </article>

              <article className="border border-red-500/30 bg-red-950/20 p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-red-300/80">
                  {release.warningLabel}
                </p>
                <p className="text-sm leading-relaxed text-gray-300">{release.warningText}</p>
              </article>
          </div>
        </div>

        <div className="mt-5 border border-cyan-500/20 bg-black/30 p-5 text-sm text-gray-400">
          <h2 className="mb-4 font-orbitron text-lg uppercase tracking-[0.12em] text-cyan-200">
            {release.creditsTitle}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {release.credits.map((credit) => (
              <p key={credit.label}>
                <strong className="text-gray-200">{credit.label}:</strong> {credit.value}
              </p>
            ))}
          </div>
          <p className="mt-5 font-mono text-xs text-gray-500">{release.legal}</p>
        </div>
      </div>
    </section>
  );
}
