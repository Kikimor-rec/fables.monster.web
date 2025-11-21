import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    status: string;
    tags: string[];
    icon: string;
    featured?: boolean;
    progress: string;
    isEncrypted?: boolean;
  };
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    if (project.isEncrypted) return "border-green-500 bg-green-900/20 text-green-400";
    switch (status) {
      case "Available Soon":
        return "border-green-500 bg-green-500/20 text-green-400";
      case "Coming Soon":
        return "border-yellow-500 bg-yellow-500/20 text-yellow-400";
      case "In Development":
        return "border-blue-500 bg-blue-500/20 text-blue-400";
      default:
        return "border-red-700 bg-red-700/20 text-red-400";
    }
  };

  if (featured) {
    return (
      <section className="py-12 sm:py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-orbitron text-glow">
              ⚠ FIRST PROJECT
            </h2>
          </div>

          <div className="bg-black border border-red-700 p-4 sm:p-8 md:p-12 hud-border">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-rajdhani border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <Link href={`/${project.id}`} className="block group">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-orbitron glitch-text group-hover:text-red-400 transition-colors" data-text={project.title}>
                    {project.title}
                  </h3>
                </Link>
                <p className="text-base sm:text-lg text-gray-300 mb-6 font-rajdhani">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-red-900/30 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-rajdhani border border-red-600 break-words">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${project.id}`}
                  className="inline-block bg-red-700 hover:bg-red-600 text-white px-6 sm:px-8 py-3 font-orbitron font-bold transition-colors border border-red-600 text-sm sm:text-base clip-path-slant hover:box-glow"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                >
                  EXPLORE PROJECT
                </Link>
              </div>
              <div className="text-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-red-600/20 blur-sm group-hover:bg-red-600/40 transition-all duration-500"></div>
                  <Image
                    src="/images/lost-mark/lm_promo_1.webp"
                    alt="Lost Mark Promo"
                    width={400}
                    height={267}
                    className="mx-auto border border-red-700 w-full max-w-sm relative z-10"
                    style={{ width: "auto", height: "auto" }}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-red-900/10 z-20 pointer-events-none mix-blend-overlay"></div>
                </div>
                <div className="text-gray-400 font-rajdhani mt-4 text-sm sm:text-base">
                  Status: {project.progress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={`bg-black border p-4 sm:p-6 transition-all duration-300 group relative overflow-hidden ${project.isEncrypted ? 'border-green-900 hover:border-green-500' : 'border-red-900 hover:border-red-500'}`}>
      {project.isEncrypted && (
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none"></div>
      )}

      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-rajdhani border ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
        <div className={`text-xl sm:text-2xl transition-opacity ${project.isEncrypted ? 'text-green-500 animate-pulse' : 'opacity-70 group-hover:opacity-100'}`}>
          {project.icon}
        </div>
      </div>

      {project.isEncrypted ? (
        <h3 className="text-xl sm:text-2xl font-bold mb-3 font-orbitron transition-colors text-green-500 glitch-text" data-text={project.title}>
          {project.title}
        </h3>
      ) : (
        <Link href={`/${project.id}`} className="block">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 font-orbitron transition-colors text-white group-hover:text-red-400 group-hover:text-glow" data-text={project.title}>
            {project.title}
          </h3>
        </Link>
      )}

      <p className={`mb-4 font-rajdhani text-sm sm:text-base ${project.isEncrypted ? 'encrypted-text text-green-400 text-xs' : 'text-gray-300'}`}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 relative z-10">
        {project.tags.map((tag) => (
          <span key={tag} className={`px-2 py-1 text-xs font-rajdhani border break-words ${project.isEncrypted ? 'bg-green-900/20 text-green-400 border-green-700' : 'bg-red-900/20 text-red-300 border-red-900'}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center relative z-10">
        {project.isEncrypted ? (
          <span className="text-green-600 font-orbitron font-bold text-sm sm:text-base cursor-not-allowed">
            ACCESS DENIED 🔒
          </span>
        ) : (
          <Link
            href={`/${project.id}`}
            className="text-red-400 hover:text-white font-orbitron font-bold transition-colors text-sm sm:text-base hover:text-glow"
          >
            LEARN MORE →
          </Link>
        )}
        <div className={`text-xs font-rajdhani ${project.isEncrypted ? 'text-green-700' : 'text-gray-500'}`}>
          {project.progress}
        </div>
      </div>
    </div>
  );
}
