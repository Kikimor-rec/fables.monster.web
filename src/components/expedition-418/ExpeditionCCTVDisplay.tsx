import Image from "next/image";

interface ExpeditionCCTVDisplayProps {
  imageAlt: string;
  whyTitle: string;
}

export default function ExpeditionCCTVDisplay({ imageAlt, whyTitle }: ExpeditionCCTVDisplayProps) {
  return (
    <div className="relative w-full aspect-video bg-gray-900 border-2 border-cyan-700 overflow-hidden cctv-container cctv-corners">
      <Image src="/images/teapot-concept.webp" alt={imageAlt} fill sizes="(max-width: 768px) 100vw, 1280px" className="cctv-image" />

      <div className="cctv-tint" />
      <div className="cctv-noise" />
      <div className="cctv-scanlines" />
      <div className="cctv-interlace" />
      <div className="cctv-vignette" />
      <div className="cctv-glitch-bar" />

      <div className="cctv-cam-id">CAM_418 // UNIT_TEAPOT</div>

      <div className="cctv-rec">
        <span className="cctv-rec-dot" />
        REC
      </div>

      <div className="cctv-timestamp">
        <a
          href="https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-300 transition-colors cursor-help"
          title={whyTitle}
        >
          2418.04.18 // 04:18:00 // ERR_418
        </a>
      </div>

      <div className="corner-bl" />
      <div className="corner-br" />
    </div>
  );
}
