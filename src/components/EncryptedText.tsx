'use client';

import { useState, useEffect } from 'react';

interface EncryptedTextProps {
    text: string;
    className?: string;
    revealOnHover?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function EncryptedText({ text, className = '', revealOnHover = true }: EncryptedTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

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
        // Initial scrambling
        if (!isHovered && !reduceMotion) {
            setDisplayText(
                text.split('').map(char => {
                    if (char === ' ') return ' ';
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join('')
            );
        } else {
            setDisplayText(text);
        }
    }, [text, isHovered, reduceMotion]);

    useEffect(() => {
        if (isHovered || reduceMotion) return;

        const interval = setInterval(() => {
            setDisplayText(prev =>
                prev.split('').map((char, i) => {
                    if (text[i] === ' ') return ' ';
                    // Randomly change some characters occasionally
                    if (Math.random() > 0.95) {
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                    return char;
                }).join('')
            );
        }, 140);

        return () => clearInterval(interval);
    }, [text, isHovered, reduceMotion]);

    return (
        <span
            className={`${className} ${revealOnHover ? 'cursor-pointer' : ''} font-mono`}
            onMouseEnter={revealOnHover ? () => setIsHovered(true) : undefined}
            onMouseLeave={revealOnHover ? () => setIsHovered(false) : undefined}
            title={revealOnHover ? "Hover to decrypt" : undefined}
        >
            {displayText}
        </span>
    );
}
