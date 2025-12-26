'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Trophy, Target, TrendingUp, ChevronRight } from 'lucide-react';

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#0a1628] to-[#020408]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animation: `floatUp ${8 + Math.random() * 12}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

const features = [
  { icon: Target, title: 'Track Macros', desc: 'Protein, carbs, fat - precision logging' },
  { icon: TrendingUp, title: 'Level Up', desc: 'XP rewards for hitting your goals' },
  { icon: Trophy, title: 'Compete', desc: 'Leaderboards with friends (coming soon)' },
];

export default function WelcomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6">
      <AnimatedBackground />
      <FloatingParticles />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Logo / Title */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-cyan-500 via-purple-500 to-orange-500 rounded-3xl mb-6 shadow-2xl shadow-cyan-500/30">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              STAY FIT
            </span>
            <br />
            <span className="text-white">WITH AI</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Level up your nutrition. Gamify your fitness.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-4 mb-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 text-left backdrop-blur-sm"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 text-white font-bold text-xl rounded-2xl 
            hover:from-cyan-400 hover:via-purple-400 hover:to-cyan-400 
            hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-[1.02]
            transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <span>START TRACKING</span>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-gray-600 text-sm mt-4">
          Free to use • No account required
        </p>
      </div>
    </main>
  );
}
