'use client';

import { ReactNode } from 'react';
import { Plus, Zap, AlertCircle } from 'lucide-react';

// Solo Leveling Background - Technical Blueprint with Radar Arcs
export function SoloLevelingBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden" style={{ backgroundColor: '#020510' }}>

            {/* LAYER 1: Large curved RADAR/SONAR arcs */}
            <svg
                className="absolute inset-0 w-full h-full animate-slow-rotate"
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMidYMid slice"
                style={{ opacity: 0.2 }}
            >
                <defs>
                    <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Large sweeping arcs - radar style */}
                <g filter="url(#arc-glow)">
                    <path d="M800,100 A400,400 0 0,1 800,500" stroke="rgba(80,150,220,0.4)" strokeWidth="1" fill="none" />
                    <path d="M850,50 A450,450 0 0,1 850,550" stroke="rgba(80,150,220,0.3)" strokeWidth="0.8" fill="none" />
                    <path d="M900,0 A500,500 0 0,1 900,600" stroke="rgba(80,150,220,0.2)" strokeWidth="0.6" fill="none" />

                    <path d="M200,700 A350,350 0 0,0 200,300" stroke="rgba(80,150,220,0.4)" strokeWidth="1" fill="none" />
                    <path d="M150,750 A400,400 0 0,0 150,250" stroke="rgba(80,150,220,0.3)" strokeWidth="0.8" fill="none" />
                    <path d="M100,800 A450,450 0 0,0 100,200" stroke="rgba(80,150,220,0.2)" strokeWidth="0.6" fill="none" />

                    {/* Concentric circles in corner */}
                    <circle cx="850" cy="150" r="80" stroke="rgba(80,150,220,0.25)" strokeWidth="0.5" fill="none" />
                    <circle cx="850" cy="150" r="120" stroke="rgba(80,150,220,0.2)" strokeWidth="0.5" fill="none" />
                    <circle cx="850" cy="150" r="160" stroke="rgba(80,150,220,0.15)" strokeWidth="0.5" fill="none" />
                </g>
            </svg>

            {/* LAYER 2: Diagonal grid lines */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMidYMid slice"
                style={{ opacity: 0.15 }}
            >
                {/* Diagonal lines crossing */}
                <line x1="0" y1="200" x2="600" y2="800" stroke="rgba(100,180,255,0.4)" strokeWidth="0.5" />
                <line x1="0" y1="400" x2="400" y2="800" stroke="rgba(100,180,255,0.3)" strokeWidth="0.5" />
                <line x1="200" y1="0" x2="800" y2="600" stroke="rgba(100,180,255,0.35)" strokeWidth="0.5" />
                <line x1="400" y1="0" x2="1000" y2="600" stroke="rgba(100,180,255,0.3)" strokeWidth="0.5" />
                <line x1="600" y1="0" x2="1000" y2="400" stroke="rgba(100,180,255,0.25)" strokeWidth="0.5" />

                {/* Opposite diagonal */}
                <line x1="1000" y1="200" x2="400" y2="800" stroke="rgba(100,180,255,0.3)" strokeWidth="0.5" />
                <line x1="800" y1="0" x2="200" y2="600" stroke="rgba(100,180,255,0.35)" strokeWidth="0.5" />
                <line x1="1000" y1="400" x2="600" y2="800" stroke="rgba(100,180,255,0.25)" strokeWidth="0.5" />

                {/* Horizontal/vertical lines */}
                <line x1="0" y1="300" x2="1000" y2="300" stroke="rgba(100,180,255,0.2)" strokeWidth="0.3" />
                <line x1="0" y1="500" x2="1000" y2="500" stroke="rgba(100,180,255,0.2)" strokeWidth="0.3" />
                <line x1="300" y1="0" x2="300" y2="800" stroke="rgba(100,180,255,0.15)" strokeWidth="0.3" />
                <line x1="700" y1="0" x2="700" y2="800" stroke="rgba(100,180,255,0.15)" strokeWidth="0.3" />
            </svg>

            {/* LAYER 3: Scattered tech rectangles */}
            <svg
                className="absolute inset-0 w-full h-full animate-pulse-slow"
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMidYMid slice"
                style={{ opacity: 0.2 }}
            >
                {/* Small scattered rectangles */}
                <rect x="100" y="150" width="40" height="25" stroke="rgba(100,180,255,0.5)" strokeWidth="0.8" fill="none" />
                <rect x="750" y="100" width="50" height="30" stroke="rgba(100,180,255,0.4)" strokeWidth="0.8" fill="none" />
                <rect x="600" y="600" width="60" height="35" stroke="rgba(100,180,255,0.45)" strokeWidth="0.8" fill="none" />
                <rect x="200" y="500" width="45" height="28" stroke="rgba(100,180,255,0.4)" strokeWidth="0.8" fill="none" />
                <rect x="850" y="450" width="35" height="22" stroke="rgba(100,180,255,0.35)" strokeWidth="0.8" fill="none" />
                <rect x="50" y="650" width="55" height="32" stroke="rgba(100,180,255,0.4)" strokeWidth="0.8" fill="none" />

                {/* Corner brackets */}
                <path d="M80,80 L80,60 L100,60" stroke="rgba(100,180,255,0.5)" strokeWidth="1" fill="none" />
                <path d="M920,80 L920,60 L900,60" stroke="rgba(100,180,255,0.5)" strokeWidth="1" fill="none" />
                <path d="M80,720 L80,740 L100,740" stroke="rgba(100,180,255,0.5)" strokeWidth="1" fill="none" />
                <path d="M920,720 L920,740 L900,740" stroke="rgba(100,180,255,0.5)" strokeWidth="1" fill="none" />
            </svg>

            {/* LAYER 4: Topographic/wavy curves */}
            <svg
                className="absolute inset-0 w-full h-full animate-drift"
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMidYMid slice"
                style={{ opacity: 0.12 }}
            >
                <path d="M0,200 Q200,150 400,200 T800,180 T1000,220" stroke="rgba(100,180,255,0.5)" strokeWidth="0.6" fill="none" />
                <path d="M0,250 Q250,200 500,250 T900,230 T1000,270" stroke="rgba(100,180,255,0.4)" strokeWidth="0.5" fill="none" />
                <path d="M0,550 Q200,500 400,550 T800,530 T1000,570" stroke="rgba(100,180,255,0.5)" strokeWidth="0.6" fill="none" />
                <path d="M0,600 Q250,550 500,600 T900,580 T1000,620" stroke="rgba(100,180,255,0.4)" strokeWidth="0.5" fill="none" />
            </svg>

            {/* LAYER 5: Glowing energy spots */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <filter id="spot-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <circle className="animate-node-pulse" cx="850" cy="200" r="15" fill="rgba(80,150,220,0.3)" filter="url(#spot-glow)" />
                <circle className="animate-node-pulse-delayed" cx="150" cy="600" r="12" fill="rgba(80,150,220,0.25)" filter="url(#spot-glow)" />
            </svg>

            {/* LAYER 6: DARK VIGNETTE */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 10%, rgba(2, 5, 16, 0.6) 50%, rgba(1, 2, 8, 0.95) 100%)',
                }}
            />
        </div>
    );
}

// White outlined panel box
export function SystemPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`relative border border-white/40 bg-transparent ${className}`}>
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="relative p-4 md:p-6">
                {children}
            </div>
        </div>
    );
}

// Panel with header title
export function SystemPanelWithHeader({ title, icon: Icon, children, className = '' }: {
    title: string;
    icon?: React.ElementType;
    children: ReactNode;
    className?: string;
}) {
    const IconComponent = Icon || AlertCircle;
    return (
        <div className={`relative border border-white/40 bg-transparent ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/20">
                    <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                        <IconComponent className="w-3 h-3 text-white" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))' }} />
                    </div>
                    <span className="text-white text-sm tracking-[0.2em] uppercase font-bold" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                        {title}
                    </span>
                </div>
                {/* Content */}
                <div className="p-4 md:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Glowing number with bloom effect
export function GlowNumber({ value, size = 'lg' }: { value: number | string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
    const sizeClasses = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-4xl',
        xl: 'text-7xl md:text-8xl'
    };
    return (
        <span
            className={`font-bold text-white ${sizeClasses[size]}`}
            style={{
                textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(100,200,255,0.6), 0 0 40px rgba(100,200,255,0.4)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
        >
            {value}
        </span>
    );
}

// Progress bar (HP/MP style)
export function VitalBar({ icon: Icon, label, current, max, color }: {
    icon: React.ElementType;
    label: string;
    current: number;
    max: number;
    color: 'green' | 'blue' | 'orange' | 'purple';
}) {
    const colorMap = {
        green: { bar: 'bg-green-400', shadow: 'rgba(74,222,128,0.5)' },
        blue: { bar: 'bg-cyan-400', shadow: 'rgba(34,211,238,0.5)' },
        orange: { bar: 'bg-orange-400', shadow: 'rgba(251,146,60,0.5)' },
        purple: { bar: 'bg-purple-400', shadow: 'rgba(192,132,252,0.5)' },
    };
    const percent = max > 0 ? (current / max) * 100 : 0;

    return (
        <div className="flex items-center gap-3">
            <div className="flex flex-col items-center min-w-[40px]">
                <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center" style={{ boxShadow: '0 0 8px rgba(255,255,255,0.3)' }}>
                    <Icon className="w-4 h-4 text-white" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.5))' }} />
                </div>
                <span className="text-white text-xs mt-1 font-medium" style={{ textShadow: '0 0 8px rgba(255,255,255,0.4)' }}>{label}</span>
            </div>
            <div className="flex-1">
                <div className="h-3 bg-slate-800/50 border border-white/20">
                    <div
                        className={`h-full ${colorMap[color].bar}`}
                        style={{ width: `${percent}%`, boxShadow: `0 0 10px ${colorMap[color].shadow}` }}
                    />
                </div>
                <p className="text-white text-xs text-right mt-1 font-bold" style={{ textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>{current}<span className="text-white/80">/{max}</span></p>
            </div>
        </div>
    );
}

// Simple action button with micro-interactions
export function SystemButton({ children, onClick, className = '', disabled = false }: {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-4 border border-white/40 bg-white/5 text-white font-bold tracking-[0.15em] uppercase
                transition-all duration-150 flex items-center justify-center gap-2 group
                hover:bg-white/10 hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
                active:scale-[0.98] active:bg-white/15
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5
                ${className}`}
            style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
        >
            {children}
        </button>
    );
}

// Page layout wrapper
export function SoloLevelingLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen relative">
            <SoloLevelingBackground />
            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </main>
    );
}
