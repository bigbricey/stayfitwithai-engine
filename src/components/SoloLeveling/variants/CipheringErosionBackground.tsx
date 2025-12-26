import React from 'react';

// ARCHIVED VARIANT: Data Erosion / Ciphering Background (v5)
// Saved on request by user before refining further.
// Features: SVG Turbulence for "eroded" lines, smoke noise background, floating particles.

export function CipheringErosionBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#02050c]">
            {/* 
                GLOBAL SVG FILTERS 
                These define the "Texture" and "Erosion" styles used throughout the UI.
            */}
            <svg className="absolute w-0 h-0">
                <defs>
                    {/* FILTER 1: Electric Distortion (The "Ciphering" Effect) 
                        Creates the gritty, jagged, eroding edges.
                    */}
                    <filter id="electric-distortion">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="warp">
                            {/* Slowly animate the noise to make edges ripple like smoke */}
                            <animate attributeName="baseFrequency" values="0.04;0.041;0.04" dur="8s" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="4" in="SourceGraphic" in2="warp" />
                    </filter>

                    {/* FILTER 2: Smoke Noise (The "Murky" Background)
                        Creates the swirling, liquid-like atmosphere.
                    */}
                    <filter id="smoke-noise">
                        <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="5" result="turbulence">
                            <animate attributeName="baseFrequency" values="0.01;0.012;0.01" dur="15s" repeatCount="indefinite" />
                        </feTurbulence>
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" in="turbulence" result="smoke" />
                        <feComposite in="smoke" in2="SourceGraphic" operator="in" />
                    </filter>

                    {/* FILTER 3: Heavy Bloom (The "Energy" Glow) */}
                    <filter id="heavy-bloom" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* LAYER 1: The Murky Background (Fluid Smoke) */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen">
                <svg width="100%" height="100%">
                    <rect width="100%" height="100%" filter="url(#smoke-noise)" fill="#003366" opacity="0.5" />
                </svg>
            </div>

            {/* LAYER 2: Ciphering "Data Lines" (Eroded Structures) */}
            <div className="absolute inset-0 pointer-events-none" style={{ filter: "url(#electric-distortion)" }}>
                <svg width="100%" height="100%">
                    {/* Large "System" Arcs - Eroded */}
                    <path
                        d="M -100 200 Q 300 100 600 -100"
                        stroke="rgba(0, 119, 255, 0.4)"
                        strokeWidth="2"
                        fill="none"
                    />
                    <path
                        d="M -100 400 Q 400 300 800 -100"
                        stroke="rgba(0, 119, 255, 0.3)"
                        strokeWidth="3"
                        fill="none"
                    />

                    {/* Vertical "Data Rain" Lines */}
                    <line x1="85%" y1="0" x2="85%" y2="100%" stroke="rgba(0, 150, 255, 0.2)" strokeWidth="1" />
                    <line x1="15%" y1="0" x2="15%" y2="100%" stroke="rgba(0, 150, 255, 0.2)" strokeWidth="1" />

                    {/* Tech Decor */}
                    <rect x="83%" y="15%" width="4%" height="10%" stroke="rgba(0, 180, 255, 0.3)" fill="none" />
                    <rect x="13%" y="75%" width="4%" height="5%" stroke="rgba(0, 180, 255, 0.3)" fill="none" />
                </svg>
            </div>

            {/* LAYER 3: Floating Data Particles (The "Ciphering Off" Effect) */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(#00aaff 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                    animation: 'cipher-float 8s linear infinite'
                }}
            />

            {/* LAYER 4: Deep Vignette (Central Focus) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02050c_90%)]" />
        </div>
    );
}

// Note: Requires animations defined in globals.css (cipher-float)
