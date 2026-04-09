"use client";

import dynamic from 'next/dynamic';

const CursorGlow = dynamic(() => import('@/components/CursorGlow'), { ssr: false });
const BootSequence = dynamic(() => import('@/components/BootSequence'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });

export default function ClientFeatures() {
    return (
        <>
            <CursorGlow />
            <BootSequence />
            <EasterEggs />
        </>
    );
}
