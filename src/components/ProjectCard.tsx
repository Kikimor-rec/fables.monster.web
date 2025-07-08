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
  };
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available Now":
        return "border-green-500 bg-green-500/20";
      case "Coming Soon":
        return "border-yellow-500 bg-yellow-500/20";
      case "In Development":
        return "border-blue-500 bg-blue-500/20";
      default:
        return "border-red-700 bg-red-700/20";
    }
  };

  if (featured) {
    return (
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 font-mono">
              ⚠ FIRST PROJECT
            </h2>
          </div>
          
          <div className="bg-black border border-red-700 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 text-sm text-white font-mono border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-4xl font-bold text-white mb-4 font-mono">
                  {project.title}
                </h3>
                <p className="text-lg text-gray-300 mb-6 font-mono">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-red-700 text-white px-3 py-1 text-sm font-mono border border-red-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${project.id}`}
                  className="inline-block bg-red-700 hover:bg-red-600 text-white px-8 py-3 font-mono font-bold transition-colors border border-red-600"
                >
                  EXPLORE PROJECT
                </Link>
              </div>
              <div className="text-center">
                <div className="relative">
                  <Image
                    src="/images/lost-mark/lm_promo_1.webp"
                    alt="Lost Mark Promo"
                    width={400}
                    height={267}
                    className="mx-auto border-2 border-red-700"
                    style={{ width: "auto", height: "auto" }}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-red-700/10"></div>
                </div>
                <div className="text-gray-400 font-mono mt-4">
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
    <div className="bg-black border border-red-700 p-6 hover:border-red-500 transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 text-sm text-white font-mono border ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
        <div className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">
          {project.icon}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3 font-mono group-hover:text-red-400 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-gray-300 mb-4 font-mono text-sm">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="bg-red-700/30 text-red-300 px-2 py-1 text-xs font-mono border border-red-700">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <Link
          href={`/${project.id}`}
          className="text-red-400 hover:text-white font-mono font-bold transition-colors"
        >
          LEARN MORE →
        </Link>
        <div className="text-xs text-gray-500 font-mono">
          {project.progress}
        </div>
      </div>
    </div>
  );
}
