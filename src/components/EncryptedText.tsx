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

    useEffect(() => {
        // Initial scrambling
        if (!isHovered) {
            setDisplayText(
                text.split('').map(char => {
                    if (char === ' ') return ' ';
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join('')
            );
        } else {
            setDisplayText(text);
        }
    }, [text, isHovered]);

    useEffect(() => {
        if (isHovered) return;

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
        }, 100);

        return () => clearInterval(interval);
    }, [text, isHovered]);

    return (
        <span
            className={`${className} ${revealOnHover ? 'cursor-pointer' : ''} font-mono`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title={revealOnHover ? "Hover to decrypt" : undefined}
        >
            {displayText}
        </span>
    );
}
