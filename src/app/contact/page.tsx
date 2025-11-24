import { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Get in Touch with Fables Monster Studio",
  description: "Contact Fables Monster Studio for collaborations, questions about our tabletop RPG projects, or general inquiries. Join our Discord community and follow us on social media.",
  keywords: "contact, Fables Monster Studio, RPG collaboration, Discord, social media, tabletop RPG community",
  openGraph: {
    title: "Contact Fables Monster Studio",
    description: "Get in touch with us for collaborations and questions about our tabletop RPG projects.",
    url: "https://fables.monster/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Fables Monster Studio",
    description: "Get in touch for collaborations and RPG project inquiries.",
  },
  alternates: {
    canonical: "https://fables.monster/contact"
  }
};


export default function Contact() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg">
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
              <h2 className="text-3xl font-bold text-white mb-8 font-orbitron tracking-wide">
                GET IN TOUCH
              </h2>
              <div className="flex flex-col items-start gap-8 mb-8 p-3">
                <a href="https://discord.gg/qJS4h5usxe" target="_blank" rel="noopener noreferrer" title="Discord" className="block hover:opacity-80 transition-opacity">
                  <Image src="/logos/discord-badge-color.png" alt="Discord" width={200} height={40} className="h-10 w-auto drop-shadow mx-0" />
                </a>
                <a href="https://fablesmonster.itch.io/" target="_blank" rel="noopener noreferrer" title="Itch.io" className="block hover:opacity-80 transition-opacity">
                  <Image src="/logos/logo-white-new.svg" alt="Itch.io" width={200} height={40} className="h-10 w-auto drop-shadow mx-0" />
                </a>
                <a href="https://patreon.com/FablesMonster?fables.monster" target="_blank" rel="noopener noreferrer" title="Patreon" className="block hover:opacity-80 transition-opacity">
                  <Image src="/logos/patreon-badge-color.png" alt="Patreon" width={200} height={40} className="h-10 w-auto drop-shadow mx-0" />
                </a>
                <a href="https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov?affiliate_id=2863466" target="_blank" rel="noopener noreferrer" title="DriveThruRPG" className="block hover:opacity-80 transition-opacity">
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
