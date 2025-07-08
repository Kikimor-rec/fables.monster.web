import SocialLinks from "@/components/SocialLinks";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="bg-black">
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
                    <a 
                      href="mailto:info@fables.monster" 
                      className="text-gray-300 font-mono hover:text-red-400 transition-colors"
                    >
                      info@fables.monster
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-red-400 text-2xl">💬</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">Discord</h3>
                    <a 
                      href="https://discord.gg/qJS4h5usxe" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 font-mono hover:text-red-400 transition-colors"
                    >
                      Join our community server
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-red-400 text-2xl">🎮</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">Itch.io</h3>
                    <a 
                      href="https://fablesmonster.itch.io/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 font-mono hover:text-red-400 transition-colors"
                    >
                      fablesmonster.itch.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-red-400 text-2xl">💰</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">Patreon</h3>
                    <a 
                      href="https://patreon.com/FablesMonster?fables.monster" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 font-mono hover:text-red-400 transition-colors"
                    >
                      Support our work
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-red-400 text-2xl">📚</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">DriveThruRPG</h3>
                    <a 
                      href="https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 font-mono hover:text-red-400 transition-colors"
                    >
                      Our RPG collection
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-950/20 border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-mono">
            JOIN OUR COMMUNITY
          </h2>
          <p className="text-gray-300 font-mono mb-8 max-w-2xl mx-auto">
            Connect with fellow RPG enthusiasts and get the latest updates on our projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/qJS4h5usxe"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 text-lg font-mono font-bold transition-colors border border-red-600"
            >
              JOIN DISCORD
            </a>
            <a
              href="https://patreon.com/FablesMonster?fables.monster"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              NEWSLETTER
            </a>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-black border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">
            FOLLOW US
          </h2>
          <SocialLinks showLabels={true} className="justify-center" />
        </div>
      </section>
    </div>
  );
}
