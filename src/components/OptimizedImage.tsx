"use client";

import Image from "next/image";
import { useState } from "react";
import NoSignalPlaceholder from "./NoSignalPlaceholder";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

// Simple base64 blur placeholder
const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+i9tVDkwYKQIwBJZBgMPSCVUeYILrADdRWHAq+KG1m9x9iZlVLB7UtGjMIf7uc1VE1HjjQcQzAAQVAtJBQW3JZGvBHYN5lNvACEUtNjYKMQCCiVKK2tJxBIUCJcHqMVvZpq+RfUfOUJCQkJBCQkJBCQkJBCQkJBCQkJBCQkJBCQkJBCQkJBCQkJBCQkJBCQkJBCQkJD//2Q==";

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  style,
  priority = false,
  sizes,
  quality = 85
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <NoSignalPlaceholder 
        className={className}
        text="NO SIGNAL"
      />
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={style}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
      )}
    </>
  );
}
