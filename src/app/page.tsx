'use client';

import { useState, useEffect, useTransition } from 'react';
import { FoodLogForm, DailySummary } from '@/components/Food';
import { saveMeal, getTodaysMeals } from '@/lib/actions/meals';
import { Zap, Trophy } from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: string;
  created_at: string;
}

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animation: `floatUp ${8 + Math.random() * 12}s linear infinite`,
          }}
        />
      ))}
      {[...Array(10)].map((_, i) => (
        <div
          key={`large-${i}`}
          className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${12 + Math.random() * 8}s`,
            animation: `floatUp ${12 + Math.random() * 8}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020408] via-[#0a1628] to-[#020408]" />

      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Grid overlay */}
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

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load today's meals on mount
  useEffect(() => {
    setMounted(true);
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const todaysMeals = await getTodaysMeals();
      setMeals(todaysMeals);
    } catch (error) {
      console.error('Error loading meals:', error);
    }
  };

  const handleSubmit = async (mealData: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  }) => {
    startTransition(async () => {
      try {
        await saveMeal(mealData);
        await loadMeals(); // Refresh the list

        // Show success animation
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (error) {
        console.error('Error saving meal:', error);
      }
    });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <FloatingParticles />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-green-500/50 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="font-bold">+XP Earned!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 p-4 border-b border-cyan-500/20">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider text-cyan-100">
                FUEL TRACKER
              </h1>
              <p className="text-xs text-gray-500">Level up your nutrition</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto p-4 space-y-6">
        {/* Daily Summary */}
        <DailySummary meals={meals} />

        {/* Food Log Form */}
        <FoodLogForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </main>
  );
}
