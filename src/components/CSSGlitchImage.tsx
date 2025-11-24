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
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle hover pause
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Handle scroll pause (when image is in viewport center)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Check if the image is in the center of the viewport (within 20% of center)
      const centerY = windowHeight / 2;
      const imageCenterY = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(imageCenterY - centerY);
      const threshold = windowHeight * 0.2; // 20% of viewport height
      
      setIsPaused(distanceFromCenter < threshold);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
