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
            <div className="bg-black text-white flex items-center justify-center h-screen m-0 font-sans">
                <div className="text-center">
                    <h1 className="text-[6rem] m-0 text-red-500">404</h1>
                    <p className="text-gray-400">Redirecting...</p>
                </div>
            </div>
        );
    }
    
    // Fallback 404 - should rarely be shown as middleware handles redirection
    return (
        <div className="bg-black text-white flex items-center justify-center h-screen m-0 font-sans">
            <div className="text-center">
                <h1 className="text-[6rem] m-0 text-red-500">404</h1>
                <p className="text-gray-400">Page not found</p>
                <Link href="/en" className="text-blue-400 mt-4 inline-block">
                    Return Home
                </Link>
            </div>
        </div>
    );
}
