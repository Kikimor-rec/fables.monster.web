"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(true);
    
    useEffect(() => {
        // Detect language from browser
        const browserLang = navigator.language.toLowerCase();
        const lang = browserLang.startsWith('ru') ? 'ru' : 'en';
        
        // Get current path for redirect
        const currentPath = window.location.pathname;
        
        // If already has language prefix, don't redirect - middleware should handle
        if (currentPath.startsWith('/en/') || currentPath.startsWith('/ru/')) {
            setIsRedirecting(false);
            return;
        }
        
        // Redirect to language-prefixed path (middleware will handle 404)
        router.replace(`/${lang}${currentPath}`);
    }, [router]);
    
    if (isRedirecting) {
        return (
            <div style={{ 
                backgroundColor: 'black', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100vh',
                margin: 0,
                fontFamily: 'system-ui, sans-serif'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '6rem', margin: 0, color: '#ef4444' }}>404</h1>
                    <p style={{ color: '#9ca3af' }}>Redirecting...</p>
                </div>
            </div>
        );
    }
    
    // Fallback 404 - should rarely be shown as middleware handles redirection
    return (
        <div style={{ 
            backgroundColor: 'black', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            margin: 0,
            fontFamily: 'system-ui, sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '6rem', margin: 0, color: '#ef4444' }}>404</h1>
                <p style={{ color: '#9ca3af' }}>Page not found</p>
                <Link href="/en" style={{ color: '#60a5fa', marginTop: '1rem', display: 'inline-block' }}>
                    Return Home
                </Link>
            </div>
        </div>
    );
}
