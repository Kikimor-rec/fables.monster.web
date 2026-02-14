"use client";

import { useEffect, useRef, useState } from 'react';
import OptimizedImage from './OptimizedImage';

interface CSSGlitchImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  sizes?: string;
  theme?: 'default' | 'horror' | 'subtle' | 'intense' | 'cyberpunk-intense';
}

export default function CSSGlitchImage({
  src,
  alt,
  width = 500,
  height = 333,
  className = "",
  quality = 90,
  sizes,
  theme = 'default'
}: CSSGlitchImageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isPaused = reduceMotion || isHovering || !isInView;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: '20% 0px 20% 0px',
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`enhanced-glitch-image ${className} ${isPaused ? 'glitch-paused' : ''}`}
      style={{ 
        width: '100%',
        height: 'auto',
        aspectRatio: `${width} / ${height}`,
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className="glitch-main-image"
        style={{
          backgroundImage: `url('${src}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%'
        }}
      />
      <div 
        className={`glitch-layer glitch-layer-1 ${theme === 'horror' ? 'horror-theme' : ''} ${theme === 'cyberpunk-intense' ? 'cyberpunk-intense' : ''}`}
        style={{
          '--glitch-image': `url('${src}')`
        } as React.CSSProperties}
      />
      <div 
        className={`glitch-layer glitch-layer-2 ${theme === 'horror' ? 'horror-theme' : ''} ${theme === 'cyberpunk-intense' ? 'cyberpunk-intense' : ''}`}
        style={{
          '--glitch-image': `url('${src}')`
        } as React.CSSProperties}
      />
      {theme === 'cyberpunk-intense' && (
        <>
          <div 
            className="glitch-layer glitch-layer-3 cyberpunk-intense"
            style={{
              '--glitch-image': `url('${src}')`
            } as React.CSSProperties}
          />
          <div 
            className="glitch-layer glitch-layer-4 cyberpunk-intense"
            style={{
              '--glitch-image': `url('${src}')`
            } as React.CSSProperties}
          />
          <div 
            className="glitch-layer glitch-layer-5 cyberpunk-intense"
            style={{
              '--glitch-image': `url('${src}')`
            } as React.CSSProperties}
          />
          {/* Scanlines overlay */}
          <div className="glitch-scanlines"></div>
          {/* Digital noise overlay */}
          <div className="glitch-noise"></div>
          {/* RGB shift artifacts */}
          <div className="glitch-rgb-shift"></div>
        </>
      )}
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        sizes={sizes}
        className="w-full h-full object-cover"
        style={{ 
          maxWidth: '100%', 
          maxHeight: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
