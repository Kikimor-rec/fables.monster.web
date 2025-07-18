"use client";

import OptimizedImage from "./OptimizedImage";

export interface GlitchyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  className?: string; // class for outer wrapper
  imageClassName?: string; // class for inner image
  style?: React.CSSProperties;
}

export default function GlitchyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  quality,
  className = "",
  imageClassName = "",
  style,
}: GlitchyImageProps) {
  const wrapperStyle: React.CSSProperties & {"--glitch-image": string} = {
    ...(style || {}),
    // Provide CSS variable for glitch pseudo-elements
    "--glitch-image": `url(${src})`,
  };

  return (
    <div className={`image-glitch ${className}`} style={wrapperStyle}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={imageClassName}
      />
    </div>
  );
}
