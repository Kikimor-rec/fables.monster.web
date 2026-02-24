import Image from "next/image";

export default function ExpeditionHeroLogo() {
  return (
    <Image
      src="/logos/expedition-418-logo.png"
      alt=""
      aria-hidden="true"
      width={4096}
      height={1845}
      sizes="(max-width: 640px) 320px, (max-width: 768px) 520px, (max-width: 1024px) 700px, 820px"
      priority
      className="mx-auto h-auto w-[320px] sm:w-[520px] md:w-[700px] lg:w-[820px] drop-shadow-[0_8px_26px_rgba(246,123,64,0.35)]"
    />
  );
}
