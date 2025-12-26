'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Zap, Dumbbell, Apple, Brain, Shield, ChevronRight } from 'lucide-react';

// Solo Leveling exact style background
function SoloLevelingBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0f1a]">
      {/* Diagonal structural lines like in the screenshot */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="techGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 0 50 L 50 0 M 50 100 L 100 50" stroke="#0ea5e9" strokeWidth="0.5" fill="none" />
            <path d="M 0 0 L 100 100 M 100 0 L 0 100" stroke="#0ea5e9" strokeWidth="0.3" fill="none" opacity="0.5" />
          </pattern>
          <pattern id="gridLines" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#techGrid)" />
        <rect width="100%" height="100%" fill="url(#gridLines)" opacity="0.3" />
      </svg>

      {/* Ambient blue glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-500/5 blur-[80px]" />
      <div className="absolute top-0 right-0 w-[300px] h-[200px] bg-cyan-400/5 blur-[60px]" />
    </div>
  );
}

// Progress bar like HP/MP
function StatusBar({ label, current, max, icon: Icon, color }: {
  label: string;
  current: number;
  max: number;
  icon: React.ElementType;
  color: string;
}) {
  const percent = (current / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-cyan-100/80 text-sm w-8">{label}</span>
      <div className="flex-1 h-2 bg-slate-800/80 border border-cyan-500/30">
        <div
          className={`h-full ${color === 'text-red-400' ? 'bg-red-500/80' : 'bg-cyan-500/80'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-cyan-100/60 text-xs w-20 text-right">
        {current}<span className="text-cyan-500/40">/{max}</span>
      </span>
    </div>
  );
}

// Stat item like STR, VIT, etc
function StatItem({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-cyan-100/70 text-sm">{label}:</span>
      <span className="text-white text-2xl font-bold ml-auto">{value}</span>
    </div>
  );
}

export default function WelcomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 md:p-8">
      <SoloLevelingBackground />

      <div className={`relative z-10 w-full max-w-4xl transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Level Header Section */}
        <div className="flex items-end gap-6 mb-6">
          <div>
            <span className="text-7xl md:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              1
            </span>
            <p className="text-cyan-400/80 text-sm tracking-widest uppercase -mt-2">LEVEL</p>
          </div>
          <div className="pb-2">
            <p className="text-cyan-100/60 text-sm">
              <span className="text-cyan-500/80">CLASS:</span> <span className="text-white">Beginner</span>
            </p>
            <p className="text-cyan-100/60 text-sm">
              <span className="text-cyan-500/80">TITLE:</span> <span className="text-white">Stay Fit with AI</span>
            </p>
          </div>
        </div>

        {/* HP/MP Bars Panel */}
        <div className="border border-cyan-500/40 bg-slate-900/60 backdrop-blur-sm p-4 md:p-6 mb-4">
          <div className="grid gap-3">
            <StatusBar label="HP" current={100} max={100} icon={Heart} color="text-red-400" />
            <StatusBar label="XP" current={0} max={100} icon={Zap} color="text-cyan-400" />
          </div>
          <div className="flex justify-end mt-2">
            <span className="text-cyan-500/60 text-xs">
              FATIGUE: <span className="text-white font-bold">0</span>
            </span>
          </div>
        </div>

        {/* Stats Grid Panel */}
        <div className="border border-cyan-500/40 bg-slate-900/60 backdrop-blur-sm p-4 md:p-6 mb-6">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            <StatItem icon={Dumbbell} label="STR" value={10} color="text-orange-400" />
            <StatItem icon={Heart} label="VIT" value={10} color="text-red-400" />
            <StatItem icon={Zap} label="AGI" value={10} color="text-yellow-400" />
            <StatItem icon={Brain} label="INT" value={10} color="text-purple-400" />
            <StatItem icon={Apple} label="NUT" value={10} color="text-green-400" />
            <div className="flex items-center justify-end col-span-1">
              <div className="text-right">
                <p className="text-cyan-500/60 text-xs">Available</p>
                <p className="text-cyan-500/60 text-xs">Ability</p>
                <p className="text-cyan-500/60 text-xs">Points:</p>
              </div>
              <span className="text-white text-3xl font-bold ml-3">0</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-5 border border-cyan-500/50 bg-cyan-500/10 text-cyan-100 font-bold text-xl tracking-widest uppercase
            hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]
            transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <span>START TRACKING</span>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>

        <p className="text-center text-cyan-500/40 text-xs mt-4 tracking-widest">
          [ SYSTEM ACTIVATED ]
        </p>
      </div>
    </main>
  );
}
