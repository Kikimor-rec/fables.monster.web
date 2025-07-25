import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const dynamic = 'error';

export default function Contact() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-nunito tracking-wider">
            CONTACT
          </h1>
         
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 font-nunito">
                GET IN TOUCH
              </h2>
              <div className="flex flex-col items-start gap-8 mb-8 p-3">
                <a href="https://discord.gg/qJS4h5usxe" target="_blank" rel="noopener noreferrer" title="Discord" className="block">
                  <Image src="/logos/discord-badge-color.png" alt="Discord" width={200} height={40} className="h-10 w-auto drop-shadow mx-0" />
                </a>
                <a href="https://fablesmonster.itch.io/" target="_blank" rel="noopener noreferrer" title="Itch.io" className="block">
                  <Image src="/logos/logo-white-new.svg" alt="Itch.io" width={200} height={40} className="h-10 w-auto drop-shadow mx-0" />
                </a>
                <a href="https://patreon.com/FablesMonster?fables.monster" target="_blank" rel="noopener noreferrer" title="Patreon" className="block">
                  <Image src="/logos/patreon-badge-color.png" alt="Patreon" width={200} height={40} className="h-10 w-auto drop-shadow mx-0" />
                </a>
                <a href="https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov?affiliate_id=2863466" target="_blank" rel="noopener noreferrer" title="DriveThruRPG" className="block">
                  <Image src="/logos/drivethrurpg-badge-color.png" alt="DriveThruRPG" width={200} height={40} className="h-10 w-auto drop-shadow mx-0" />
                </a>
              </div>

            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>     
    </div>
  );
}
