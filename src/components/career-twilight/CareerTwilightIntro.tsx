import Image from "next/image";

interface CareerTwilightIntroProps {
  dict: {
    intro: { credit: string; editor: string; polaroidCaption: string; p1: string; p2: string; p3: string };
  };
}

export default function CareerTwilightIntro({ dict }: CareerTwilightIntroProps) {
  return (
    <section className="py-12 md:py-16 border-b border-cyan-500/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr] gap-10 md:gap-14 items-center">
          {/* Text column */}
          <div className="order-2 md:order-1">
            <div className="mb-6 text-sm text-cyan-400/70 font-mono">
              <p dangerouslySetInnerHTML={{ __html: dict.intro.credit }} />
              <p className="text-gray-500 mt-1">{dict.intro.editor}</p>
            </div>

            <div className="space-y-5 text-gray-300 leading-relaxed text-base md:text-lg">
              <p dangerouslySetInnerHTML={{ __html: dict.intro.p1 }} />
              <p dangerouslySetInnerHTML={{ __html: dict.intro.p2 }} />
              <p className="text-cyan-200/80 italic" dangerouslySetInnerHTML={{ __html: dict.intro.p3 }} />
            </div>
          </div>

          {/* Polaroid image column */}
          <div className="order-1 md:order-2 flex flex-col items-center md:items-end">
            <div className="ct-intro-image relative aspect-[3/4] w-full max-w-xs md:max-w-sm">
              <Image
                src="/images/career-twilight/dr-reiner.webp"
                alt="Dr. Sofia Reiner — Career Twilight"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
                priority
              />
              <p className="ct-polaroid-caption">
                {dict.intro.polaroidCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
