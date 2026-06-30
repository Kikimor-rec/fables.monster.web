import Image from 'next/image';
import Link from 'next/link';

type PlatformMap = Record<string, string | undefined> | undefined;

const PLATFORM_LABELS: Record<string, string> = {
  itch: 'Itch.io',
  driveThru: 'DriveThruRPG',
  foundry: 'Foundry VTT',
  foundryMarketplace: 'Foundry VTT',
  roll20: 'Roll20',
  patreon: 'Patreon',
  rpgbook: 'RPGBook',
  rpgTraderCreator: 'RPG Trader',
  rpgTraderProduct: 'RPG Trader',
};

const STATUS_STYLES: Record<string, string> = {
  released: 'border-green-500/80 bg-green-950/50 text-green-300',
  'in-development': 'border-yellow-500/80 bg-yellow-950/50 text-yellow-300',
  'coming-soon': 'border-blue-500/80 bg-blue-950/50 text-blue-300',
};

export function normalizeProjectStatus(status: string) {
  const normalized = status.toLowerCase().trim();
  if (['released', 'выпущено', 'вышло'].includes(normalized)) return 'released';
  if (['coming-soon', 'coming soon', 'скоро'].includes(normalized)) return 'coming-soon';
  return 'in-development';
}

export function getProjectStatusLabel(status: string, labels?: { released?: string; inDev?: string; comingSoon?: string }) {
  const normalized = normalizeProjectStatus(status);
  if (normalized === 'released') return labels?.released || 'RELEASED';
  if (normalized === 'coming-soon') return labels?.comingSoon || 'COMING SOON';
  return labels?.inDev || 'IN DEV';
}

export function getPlatformLabel(key: string) {
  return PLATFORM_LABELS[key] || key;
}

export type ProjectDossierCardProps = {
  href: string;
  title: string;
  tagline: string;
  image: string;
  status: string;
  statusLabel: string;
  system?: string;
  type?: string;
  tags?: string[];
  platforms?: PlatformMap;
  priority?: boolean;
  compact?: boolean;
};

export default function ProjectDossierCard({
  href,
  title,
  tagline,
  image,
  status,
  statusLabel,
  system,
  type,
  tags = [],
  platforms,
  priority = false,
  compact = false,
}: ProjectDossierCardProps) {
  const normalizedStatus = normalizeProjectStatus(status);
  const platformEntries = Object.entries(platforms || {}).filter((entry): entry is [string, string] => {
    return typeof entry[1] === 'string' && entry[1].length > 0;
  });

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden border border-zinc-800 bg-zinc-950/80 transition-colors hover:border-red-500/70 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        <span className={`absolute right-3 top-3 border px-3 py-1 font-orbitron text-[10px] font-bold uppercase tracking-[0.16em] ${STATUS_STYLES[normalizedStatus]}`}>
          {statusLabel}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? 'p-5' : 'p-6'}`}>
        <div className="mb-3 flex flex-wrap gap-2">
          {system && <span className="border border-cyan-800 px-2 py-1 font-rajdhani text-xs uppercase tracking-wide text-cyan-300">{system}</span>}
          {type && <span className="border border-zinc-700 px-2 py-1 font-rajdhani text-xs uppercase tracking-wide text-zinc-400">{type}</span>}
        </div>
        <h3 className="font-orbitron text-xl font-bold uppercase tracking-[0.04em] text-white transition-colors group-hover:text-red-300">
          {title}
        </h3>
        <p className="mt-3 flex-1 font-rajdhani text-sm leading-relaxed text-zinc-300">
          {tagline}
        </p>
        {(platformEntries.length > 0 || tags.length > 0) && (
          <div className="mt-5 flex flex-wrap gap-2">
            {platformEntries.slice(0, 4).map(([key]) => (
              <span key={key} className="border border-zinc-800 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase text-zinc-400">
                {getPlatformLabel(key)}
              </span>
            ))}
            {platformEntries.length === 0 && tags.slice(0, 3).map((tag) => (
              <span key={tag} className="border border-zinc-800 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase text-zinc-400">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
