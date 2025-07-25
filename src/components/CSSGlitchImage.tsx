"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import OptimizedImage from './OptimizedImage';

interface CSSGlitchImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  sizes?: string;
}

export default function CSSGlitchImage({
  src,
  alt,
  width = 500,
  height = 333,
  className = "",
  quality = 90,
  sizes
}: CSSGlitchImageProps) {
  // Generate a deterministic ID based on the image src to avoid hydration mismatches
  const animationId = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < src.length; i++) {
      hash = ((hash << 5) - hash) + src.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }, [src]);

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

  useEffect(() => {
    // Inject CSS animations with unique IDs to avoid conflicts
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glitch-1-${animationId} {
        0%, 100% {
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
          filter: hue-rotate(0deg);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          opacity: 0.9;
        }
        5% {
          transform: translate3d(-1px, 0.5px, 0) scale3d(1.01, 0.99, 1);
          filter: hue-rotate(45deg) saturate(1.1);
          clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%);
          opacity: 0.85;
        }
        10% {
          transform: translate3d(0.5px, -1px, 0) scale3d(0.99, 1.01, 1);
          filter: hue-rotate(-45deg) saturate(1.2);
          clip-path: polygon(0 97%, 100% 97%, 100% 100%, 0 100%);
          opacity: 0.9;
        }
        15% {
          transform: translate3d(-0.5px, 1px, 0) scale3d(1.01, 0.99, 1);
          filter: hue-rotate(90deg) contrast(1.1);
          clip-path: polygon(0 25%, 100% 25%, 100% 27%, 0 27%);
          opacity: 0.8;
        }
        20% {
          transform: translate3d(1px, -0.5px, 0) scale3d(0.99, 1.01, 1);
          filter: hue-rotate(-90deg) contrast(1.2);
          clip-path: polygon(0 70%, 100% 70%, 100% 72%, 0 72%);
          opacity: 0.85;
        }
        25% {
          transform: translate3d(-1px, 0, 0) scale3d(1.01, 1, 1);
          filter: hue-rotate(180deg) saturate(1.1);
          clip-path: polygon(0 45%, 100% 45%, 100% 47%, 0 47%);
          opacity: 0.9;
        }
        30% {
          transform: translate3d(0.5px, 1px, 0) scale3d(0.99, 1.01, 1);
          filter: hue-rotate(-180deg) contrast(1.1);
          clip-path: polygon(0 10%, 100% 10%, 100% 12%, 0 12%);
          opacity: 0.8;
        }
        35% {
          transform: translate3d(-0.5px, -1px, 0) scale3d(1.01, 0.99, 1);
          filter: hue-rotate(135deg) saturate(1.2);
          clip-path: polygon(0 80%, 100% 80%, 100% 82%, 0 82%);
          opacity: 0.85;
        }
        40% {
          transform: translate3d(1px, 0.5px, 0) scale3d(0.99, 1.01, 1);
          filter: hue-rotate(-135deg) contrast(1.2);
          clip-path: polygon(0 60%, 100% 60%, 100% 62%, 0 62%);
          opacity: 0.9;
        }
        45% {
          transform: translate3d(-1px, 0, 0) scale3d(1.01, 1, 1);
          filter: hue-rotate(225deg) saturate(1.1);
          clip-path: polygon(0 35%, 100% 35%, 100% 37%, 0 37%);
          opacity: 0.8;
        }
        50% {
          transform: translate3d(0.5px, -1px, 0) scale3d(0.99, 1.01, 1);
          filter: hue-rotate(-225deg) contrast(1.1);
          clip-path: polygon(0 15%, 100% 15%, 100% 17%, 0 17%);
          opacity: 0.85;
        }
        55% {
          transform: translate3d(-0.5px, 1px, 0) scale3d(1.01, 0.99, 1);
          filter: hue-rotate(270deg) saturate(1.2);
          clip-path: polygon(0 85%, 100% 85%, 100% 87%, 0 87%);
          opacity: 0.9;
        }
        60% {
          transform: translate3d(1px, 0, 0) scale3d(0.99, 1, 1);
          filter: hue-rotate(-270deg) contrast(1.2);
          clip-path: polygon(0 50%, 100% 50%, 100% 52%, 0 52%);
          opacity: 0.8;
        }
        65% {
          transform: translate3d(-1px, 0.5px, 0) scale3d(1.01, 1.01, 1);
          filter: hue-rotate(315deg) saturate(1.1);
          clip-path: polygon(0 5%, 100% 5%, 100% 7%, 0 7%);
          opacity: 0.85;
        }
        70% {
          transform: translate3d(0.5px, -1px, 0) scale3d(0.99, 0.99, 1);
          filter: hue-rotate(-315deg) contrast(1.1);
          clip-path: polygon(0 90%, 100% 90%, 100% 92%, 0 92%);
          opacity: 0.9;
        }
        75% {
          transform: translate3d(-0.5px, 1px, 0) scale3d(1.01, 1.01, 1);
          filter: hue-rotate(360deg) saturate(1.2);
          clip-path: polygon(0 20%, 100% 20%, 100% 22%, 0 22%);
          opacity: 0.8;
        }
        80% {
          transform: translate3d(1px, -0.5px, 0) scale3d(0.99, 0.99, 1);
          filter: hue-rotate(-360deg) contrast(1.2);
          clip-path: polygon(0 75%, 100% 75%, 100% 77%, 0 77%);
          opacity: 0.85;
        }
        85% {
          transform: translate3d(-1px, 0, 0) scale3d(1.01, 1, 1);
          filter: hue-rotate(180deg) saturate(1.1);
          clip-path: polygon(0 40%, 100% 40%, 100% 42%, 0 42%);
          opacity: 0.9;
        }
        90% {
          transform: translate3d(0.5px, 1px, 0) scale3d(0.99, 1.01, 1);
          filter: hue-rotate(-180deg) contrast(1.1);
          clip-path: polygon(0 55%, 100% 55%, 100% 57%, 0 57%);
          opacity: 0.8;
        }
        95% {
          transform: translate3d(-0.5px, -1px, 0) scale3d(1.01, 0.99, 1);
          filter: hue-rotate(90deg) saturate(1.2);
          clip-path: polygon(0 5%, 100% 5%, 100% 7%, 0 7%);
          opacity: 0.85;
        }
      }

      @keyframes glitch-2-${animationId} {
        0%, 100% {
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
          filter: contrast(1) brightness(1);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          opacity: 0.8;
        }
        5% {
          transform: translate3d(1px, -1px, 0) scale3d(1.01, 1.01, 1);
          filter: contrast(1.1) brightness(0.95) hue-rotate(-30deg);
          clip-path: polygon(0 5%, 100% 5%, 100% 8%, 0 8%);
          opacity: 0.75;
        }
        10% {
          transform: translate3d(-1px, 1px, 0) scale3d(0.99, 0.99, 1);
          filter: contrast(0.95) brightness(1.05) hue-rotate(30deg);
          clip-path: polygon(0 92%, 100% 92%, 100% 100%, 0 100%);
          opacity: 0.8;
        }
        15% {
          transform: translate3d(0.5px, 0, 0) scale3d(1.01, 1, 1);
          filter: contrast(1.05) brightness(0.9) hue-rotate(-60deg);
          clip-path: polygon(0 30%, 100% 30%, 100% 33%, 0 33%);
          opacity: 0.7;
        }
        20% {
          transform: translate3d(-0.5px, -0.5px, 0) scale3d(0.99, 1.01, 1);
          filter: contrast(0.9) brightness(1.1) hue-rotate(60deg);
          clip-path: polygon(0 65%, 100% 65%, 100% 68%, 0 68%);
          opacity: 0.75;
        }
        25% {
          transform: translate3d(1px, 0.5px, 0) scale3d(1.01, 0.99, 1);
          filter: contrast(1.1) brightness(0.95) hue-rotate(-90deg);
          clip-path: polygon(0 15%, 100% 15%, 100% 18%, 0 18%);
          opacity: 0.8;
        }
        30% {
          transform: translate3d(-1px, 0, 0) scale3d(0.99, 1, 1);
          filter: contrast(0.95) brightness(1.05) hue-rotate(90deg);
          clip-path: polygon(0 80%, 100% 80%, 100% 83%, 0 83%);
          opacity: 0.7;
        }
        35% {
          transform: translate3d(0.5px, 1px, 0) scale3d(1.01, 1.01, 1);
          filter: contrast(1.05) brightness(0.9) hue-rotate(-120deg);
          clip-path: polygon(0 45%, 100% 45%, 100% 48%, 0 48%);
          opacity: 0.75;
        }
        40% {
          transform: translate3d(-0.5px, -1px, 0) scale3d(0.99, 0.99, 1);
          filter: contrast(0.9) brightness(1.1) hue-rotate(120deg);
          clip-path: polygon(0 70%, 100% 70%, 100% 73%, 0 73%);
          opacity: 0.8;
        }
        45% {
          transform: translate3d(1px, 0, 0) scale3d(1.01, 1, 1);
          filter: contrast(1.1) brightness(0.95) hue-rotate(-150deg);
          clip-path: polygon(0 25%, 100% 25%, 100% 28%, 0 28%);
          opacity: 0.7;
        }
        50% {
          transform: translate3d(-1px, 0.5px, 0) scale3d(0.99, 1.01, 1);
          filter: contrast(0.95) brightness(1.05) hue-rotate(150deg);
          clip-path: polygon(0 55%, 100% 55%, 100% 58%, 0 58%);
          opacity: 0.75;
        }
        55% {
          transform: translate3d(0.5px, -1px, 0) scale3d(1.01, 0.99, 1);
          filter: contrast(1.05) brightness(0.9) hue-rotate(-180deg);
          clip-path: polygon(0 10%, 100% 10%, 100% 13%, 0 13%);
          opacity: 0.8;
        }
        60% {
          transform: translate3d(-0.5px, 1px, 0) scale3d(0.99, 1.01, 1);
          filter: contrast(0.9) brightness(1.1) hue-rotate(180deg);
          clip-path: polygon(0 85%, 100% 85%, 100% 88%, 0 88%);
          opacity: 0.7;
        }
        65% {
          transform: translate3d(1px, 0, 0) scale3d(1.01, 1, 1);
          filter: contrast(1.1) brightness(0.95) hue-rotate(-210deg);
          clip-path: polygon(0 35%, 100% 35%, 100% 38%, 0 38%);
          opacity: 0.75;
        }
        70% {
          transform: translate3d(-1px, -0.5px, 0) scale3d(0.99, 1.01, 1);
          filter: contrast(0.95) brightness(1.05) hue-rotate(210deg);
          clip-path: polygon(0 60%, 100% 60%, 100% 63%, 0 63%);
          opacity: 0.8;
        }
        75% {
          transform: translate3d(0.5px, 1px, 0) scale3d(1.01, 0.99, 1);
          filter: contrast(1.05) brightness(0.9) hue-rotate(-240deg);
          clip-path: polygon(0 20%, 100% 20%, 100% 23%, 0 23%);
          opacity: 0.7;
        }
        80% {
          transform: translate3d(-0.5px, -1px, 0) scale3d(0.99, 1.01, 1);
          filter: contrast(0.9) brightness(1.1) hue-rotate(240deg);
          clip-path: polygon(0 75%, 100% 75%, 100% 78%, 0 78%);
          opacity: 0.75;
        }
        85% {
          transform: translate3d(1px, 0, 0) scale3d(1.01, 1, 1);
          filter: contrast(1.1) brightness(0.95) hue-rotate(-270deg);
          clip-path: polygon(0 5%, 100% 5%, 100% 8%, 0 8%);
          opacity: 0.8;
        }
        90% {
          transform: translate3d(-1px, 0.5px, 0) scale3d(0.99, 1.01, 1);
          filter: contrast(0.95) brightness(1.05) hue-rotate(270deg);
          clip-path: polygon(0 90%, 100% 90%, 100% 93%, 0 93%);
          opacity: 0.7;
        }
        95% {
          transform: translate3d(0.5px, -1px, 0) scale3d(1.01, 0.99, 1);
          filter: contrast(1.05) brightness(0.9) hue-rotate(-300deg);
          clip-path: polygon(0 40%, 100% 40%, 100% 43%, 0 43%);
          opacity: 0.75;
        }
      }

      @keyframes glitch-3-${animationId} {
        0%, 100% {
          transform: translate3d(0, 0, 0);
          filter: hue-rotate(0deg);
          opacity: 1;
        }
        5% {
          transform: translate3d(-0.5px, 0.5px, 0);
          filter: hue-rotate(30deg) drop-shadow(1px 0 0 rgba(255, 0, 0, 0.15)) drop-shadow(-1px 0 0 rgba(0, 255, 255, 0.15));
          opacity: 0.95;
        }
        10% {
          transform: translate3d(0.5px, -0.5px, 0);
          filter: hue-rotate(-30deg) drop-shadow(-1px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(1px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        15% {
          transform: translate3d(-0.5px, 0, 0);
          filter: hue-rotate(60deg) drop-shadow(0.5px 0 0 rgba(255, 0, 0, 0.2)) drop-shadow(-0.5px 0 0 rgba(0, 255, 255, 0.2));
          opacity: 0.95;
        }
        20% {
          transform: translate3d(0.5px, 0.5px, 0);
          filter: hue-rotate(-60deg) drop-shadow(-0.5px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(0.5px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        25% {
          transform: translate3d(-0.5px, -0.5px, 0);
          filter: hue-rotate(90deg) drop-shadow(1px 0 0 rgba(255, 0, 0, 0.15)) drop-shadow(-1px 0 0 rgba(0, 255, 255, 0.15));
          opacity: 0.95;
        }
        30% {
          transform: translate3d(0.5px, 0, 0);
          filter: hue-rotate(-90deg) drop-shadow(-1px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(1px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        35% {
          transform: translate3d(-0.5px, 0.5px, 0);
          filter: hue-rotate(120deg) drop-shadow(0.5px 0 0 rgba(255, 0, 0, 0.2)) drop-shadow(-0.5px 0 0 rgba(0, 255, 255, 0.2));
          opacity: 0.95;
        }
        40% {
          transform: translate3d(0.5px, -0.5px, 0);
          filter: hue-rotate(-120deg) drop-shadow(-0.5px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(0.5px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        45% {
          transform: translate3d(-0.5px, 0, 0);
          filter: hue-rotate(150deg) drop-shadow(1px 0 0 rgba(255, 0, 0, 0.15)) drop-shadow(-1px 0 0 rgba(0, 255, 255, 0.15));
          opacity: 0.95;
        }
        50% {
          transform: translate3d(0.5px, 0.5px, 0);
          filter: hue-rotate(-150deg) drop-shadow(-1px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(1px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        55% {
          transform: translate3d(-0.5px, -0.5px, 0);
          filter: hue-rotate(180deg) drop-shadow(0.5px 0 0 rgba(255, 0, 0, 0.2)) drop-shadow(-0.5px 0 0 rgba(0, 255, 255, 0.2));
          opacity: 0.95;
        }
        60% {
          transform: translate3d(0.5px, 0, 0);
          filter: hue-rotate(-180deg) drop-shadow(-0.5px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(0.5px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        65% {
          transform: translate3d(-0.5px, 0.5px, 0);
          filter: hue-rotate(210deg) drop-shadow(1px 0 0 rgba(255, 0, 0, 0.15)) drop-shadow(-1px 0 0 rgba(0, 255, 255, 0.15));
          opacity: 0.95;
        }
        70% {
          transform: translate3d(0.5px, -0.5px, 0);
          filter: hue-rotate(-210deg) drop-shadow(-1px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(1px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        75% {
          transform: translate3d(-0.5px, 0, 0);
          filter: hue-rotate(240deg) drop-shadow(0.5px 0 0 rgba(255, 0, 0, 0.2)) drop-shadow(-0.5px 0 0 rgba(0, 255, 255, 0.2));
          opacity: 0.95;
        }
        80% {
          transform: translate3d(0.5px, 0.5px, 0);
          filter: hue-rotate(-240deg) drop-shadow(-0.5px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(0.5px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        85% {
          transform: translate3d(-0.5px, -0.5px, 0);
          filter: hue-rotate(270deg) drop-shadow(1px 0 0 rgba(255, 0, 0, 0.15)) drop-shadow(-1px 0 0 rgba(0, 255, 255, 0.15));
          opacity: 0.95;
        }
        90% {
          transform: translate3d(0.5px, 0, 0);
          filter: hue-rotate(-270deg) drop-shadow(-1px 0 0 rgba(255, 0, 0, 0.1)) drop-shadow(1px 0 0 rgba(0, 255, 255, 0.1));
          opacity: 1;
        }
        95% {
          transform: translate3d(-0.5px, 0.5px, 0);
          filter: hue-rotate(300deg) drop-shadow(0.5px 0 0 rgba(255, 0, 0, 0.2)) drop-shadow(-0.5px 0 0 rgba(0, 255, 255, 0.2));
          opacity: 0.95;
        }
      }

      .glitch-container-${animationId} {
        position: relative;
        display: inline-block;
        width: 100%;
        height: auto;
      }

      .glitch-container-${animationId}::before,
      .glitch-container-${animationId}::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('${src}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        pointer-events: none;
      }

      .glitch-container-${animationId}::before {
        animation: glitch-1-${animationId} 24s infinite ease-in-out alternate-reverse;
        z-index: 2;
        mix-blend-mode: screen;
        opacity: 0.8;
      }

      .glitch-container-${animationId}::after {
        animation: glitch-2-${animationId} 20s infinite ease-in-out alternate;
        z-index: 3;
        mix-blend-mode: multiply;
        opacity: 0.7;
      }

      .glitch-container-${animationId} img {
        animation: glitch-3-${animationId} 28s infinite ease-in-out;
        position: relative;
        z-index: 1;
      }

      .glitch-container-${animationId}.paused::before,
      .glitch-container-${animationId}.paused::after {
        opacity: 0 !important;
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [src, animationId]);

  return (
    <div 
      ref={containerRef}
      className={`glitch-container-${animationId} ${className} ${isPaused ? 'paused' : ''}`}
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
