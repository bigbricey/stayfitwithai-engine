'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SoloLevelingLayout, SystemPanelWithHeader, SystemPanel } from '@/components/SoloLeveling';
import { Utensils, Dumbbell, Moon, Droplet, Gem, ArrowRight, Lock } from 'lucide-react';

export default function GameHub() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const modules = [
        {
            id: 'food',
            title: 'FOOD',
            subtitle: 'Log Meals & Macros',
            icon: Utensils,
            path: '/dashboard/food',
            color: 'text-orange-400',
            locked: false
        },
        {
            id: 'exercise',
            title: 'EXERCISE',
            subtitle: 'Track Workouts',
            icon: Dumbbell,
            path: '/dashboard/exercise',
            color: 'text-red-500',
            locked: true // Placeholder for now
        },
        {
            id: 'sleep',
            title: 'SLEEP',
            subtitle: 'Recovery Data',
            icon: Moon,
            path: '/dashboard/sleep',
            color: 'text-purple-400',
            locked: true // Placeholder
        },
        {
            id: 'water',
            title: 'WATER',
            subtitle: 'Hydration Levels',
            icon: Droplet,
            path: '/dashboard/water',
            color: 'text-blue-400',
            locked: true // Placeholder
        },
        {
            id: 'minerals',
            title: 'MINERALS',
            subtitle: 'Supplement Stack',
            icon: Gem,
            path: '/dashboard/minerals',
            color: 'text-emerald-400',
            locked: true // Placeholder
        }
    ];

    if (!mounted) return null;

    return (
        <SoloLevelingLayout>
            <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">

                {/* Header */}
                <header className="w-full max-w-4xl mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-widest uppercase italic"
                            style={{ textShadow: '0 0 20px rgba(0, 200, 255, 0.6)' }}>
                            SYSTEM CONSOLE
                        </h1>
                        <p className="text-white/60 text-sm tracking-[0.2em] font-medium mt-1">
                            SELECT MODULE TO INITIALIZE
                        </p>
                    </div>
                </header>

                {/* Module Grid */}
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((mod) => (
                        <button
                            key={mod.id}
                            onClick={() => !mod.locked && router.push(mod.path)}
                            disabled={mod.locked}
                            className={`group relative h-48 w-full text-left transition-all duration-300
                                ${mod.locked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:-translate-y-2'}
                            `}
                        >
                            <SystemPanel className={`h-full flex flex-col justify-between border-2 
                                ${mod.locked
                                    ? 'border-white/10 bg-black/40'
                                    : 'border-white/20 bg-black/60 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]'
                                }
                            `}>
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-lg border ${mod.locked ? 'border-white/20' : 'border-white/40 bg-white/5'}`}>
                                        <mod.icon className={`w-8 h-8 ${mod.color}`} />
                                    </div>
                                    {mod.locked && <Lock className="w-5 h-5 text-white/30" />}
                                </div>

                                {/* Text */}
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-wider mb-1 group-hover:text-cyan-300 transition-colors">
                                        {mod.title}
                                    </h2>
                                    <p className="text-xs text-white/50 font-medium uppercase tracking-widest">
                                        {mod.subtitle}
                                    </p>
                                </div>

                                {/* Active Indicator */}
                                {!mod.locked && (
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                        <ArrowRight className="w-6 h-6 text-cyan-400" />
                                    </div>
                                )}
                            </SystemPanel>
                        </button>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-white/30 text-xs tracking-[0.3em] font-mono">
                        SYSTEM VERSION 1.5.0 // ONLINE
                    </p>
                </div>

            </div>
        </SoloLevelingLayout>
    );
}
