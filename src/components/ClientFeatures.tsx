"use client";

import dynamic from 'next/dynamic';

const BootSequence = dynamic(() => import('@/components/BootSequence'), { ssr: false });
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false });

export default function ClientFeatures() {
    return (
        <>
            <BootSequence />
            <EasterEggs />
        </>
    );
}
