import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-mono tracking-wider">
            CONTACT
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-mono">
            Get in touch with Fables Monster Studio
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 font-mono">
                GET IN TOUCH
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-red-400 text-2xl">📧</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">Email</h3>
                    <p className="text-gray-300 font-mono">contact@fables.monster</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-red-400 text-2xl">💬</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">Discord</h3>
                    <p className="text-gray-300 font-mono">Join our community server</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-red-400 text-2xl">🐦</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">Twitter</h3>
                    <p className="text-gray-300 font-mono">@fablesmonster</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black border border-red-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 font-mono">
                SEND MESSAGE
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-white font-mono font-bold mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-mono focus:outline-none focus:border-red-400"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono font-bold mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-mono focus:outline-none focus:border-red-400"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-mono font-bold mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    rows={6}
                    className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-mono focus:outline-none focus:border-red-400"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-600 text-white px-6 py-3 font-mono font-bold transition-colors border border-red-600"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-black border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">
            FOLLOW US
          </h2>
          <div className="flex justify-center space-x-8">
            <a
              href="#"
              className="text-gray-300 hover:text-red-400 transition-colors"
            >
              <div className="text-4xl mb-2">🐦</div>
              <div className="font-mono">Twitter</div>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-red-400 transition-colors"
            >
              <div className="text-4xl mb-2">💬</div>
              <div className="font-mono">Discord</div>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-red-400 transition-colors"
            >
              <div className="text-4xl mb-2">📧</div>
              <div className="font-mono">Email</div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-mono">
                FABLES MONSTER
              </h3>
              <p className="text-gray-300 font-mono">
                Independent tabletop RPG content creation studio
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4 font-mono">
                PROJECTS
              </h4>
              <ul className="space-y-2 text-gray-300 font-mono">
                <li>
                  <Link href="/lost-mark" className="hover:text-red-400 transition-colors">
                    The Lost Mark
                  </Link>
                </li>
                <li>
                  <Link href="/cemetery-of-broken-ships" className="hover:text-red-400 transition-colors">
                    Cemetery of Broken Ships
                  </Link>
                </li>
                <li>
                  <Link href="/hellish-bureaucracy" className="hover:text-red-400 transition-colors">
                    Hellish Bureaucracy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4 font-mono">
                LINKS
              </h4>
              <ul className="space-y-2 text-gray-300 font-mono">
                <li>
                  <Link href="/about" className="hover:text-red-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-red-400 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-red-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-red-700 text-center">
            <p className="text-gray-300 font-mono">
              © 2025 Fables Monster Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
