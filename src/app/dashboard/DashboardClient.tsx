'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProfileSetupModal from '@/components/ProfileSetupModal';
import CalorieBudget from '@/components/CalorieBudget';
import FoodDiary from '@/components/FoodDiary';
import ProgressTab from '@/components/ProgressTab';

interface Meal {
    id?: string;
    meal_type: string;
    description?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
}

interface DashboardProps {
    user: { id: string; email?: string };
    profile: {
        display_name?: string;
        goal_weight?: number;
        start_weight?: number;
        current_weight?: number;
        daily_calorie_goal?: number;
    } | null;
    weightEntries: Array<{ id?: string; date: string; weight: number; notes?: string }>;
    waterToday: { glasses: number } | null;
    streak: { current_streak: number; longest_streak: number } | null;
    mealsToday: Meal[];
}

export default function DashboardClient({
    user,
    profile,
    weightEntries,
    waterToday,
    streak,
    mealsToday
}: DashboardProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'diary' | 'progress' | 'settings'>('diary');
    const [showProfileSetup, setShowProfileSetup] = useState(!profile?.goal_weight || !profile?.start_weight);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const handleAddWater = async () => {
        const supabase = createClient();
        const today = new Date().toISOString().split('T')[0];
        const newGlasses = (waterToday?.glasses || 0) + 1;

        await supabase.from('water_intake').upsert({
            user_id: user.id,
            date: today,
            glasses: newGlasses,
        }, { onConflict: 'user_id,date' });

        router.refresh();
    };

    // Calculate daily totals
    const dailyGoal = profile?.daily_calorie_goal || 2000;
    const caloriesEaten = mealsToday.reduce((sum, m) => sum + (m.calories || 0), 0);
    const proteinTotal = mealsToday.reduce((sum, m) => sum + (m.protein || 0), 0);
    const carbsTotal = mealsToday.reduce((sum, m) => sum + (m.carbs || 0), 0);
    const fatTotal = mealsToday.reduce((sum, m) => sum + (m.fat || 0), 0);

    const mealsWithId = mealsToday.map((m, i) => ({ ...m, id: m.id || String(i) }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <span className="text-white font-bold text-sm">SF</span>
                        </div>
                        <span className="font-bold text-white">StayFit</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400 hidden sm:inline">{user.email}</span>
                        <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-white transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Tab Navigation */}
                <div className="flex gap-1 mb-6 bg-slate-900/50 p-1 rounded-xl">
                    {(['diary', 'progress', 'settings'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-4 py-2.5 rounded-lg font-medium capitalize transition-all ${activeTab === tab
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            {tab === 'diary' && '📝 '}
                            {tab === 'progress' && '📊 '}
                            {tab === 'settings' && '⚙️ '}
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'diary' && (
                    <div className="space-y-6">
                        {/* Calorie Budget */}
                        <CalorieBudget
                            caloriesEaten={caloriesEaten}
                            caloriesBurned={0}
                            dailyGoal={dailyGoal}
                            protein={Math.round(proteinTotal)}
                            carbs={Math.round(carbsTotal)}
                            fat={Math.round(fatTotal)}
                        />

                        {/* Water Tracker */}
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">💧</span>
                                    <div>
                                        <div className="text-white font-medium">Water</div>
                                        <div className="text-sm text-slate-400">{waterToday?.glasses || 0}/8 glasses</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <div key={i} className={`w-4 h-6 rounded-sm ${i <= (waterToday?.glasses || 0) ? 'bg-blue-500' : 'bg-slate-700'}`} />
                                    ))}
                                    <button onClick={handleAddWater} className="ml-2 bg-blue-500 hover:bg-blue-400 text-white w-8 h-8 rounded-lg font-bold transition-colors">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Food Diary */}
                        <div>
                            <h2 className="text-lg font-bold text-white mb-4">Food Diary</h2>
                            <FoodDiary userId={user.id} meals={mealsWithId} />
                        </div>
                    </div>
                )}

                {activeTab === 'progress' && (
                    <ProgressTab profile={profile} weightEntries={weightEntries} streak={streak} />
                )}

                {activeTab === 'settings' && (
                    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-slate-400">Start Weight</label>
                                <div className="text-white font-medium">{profile?.start_weight || '--'} lbs</div>
                            </div>
                            <div>
                                <label className="text-sm text-slate-400">Goal Weight</label>
                                <div className="text-white font-medium">{profile?.goal_weight || '--'} lbs</div>
                            </div>
                            <div>
                                <label className="text-sm text-slate-400">Current Weight</label>
                                <div className="text-white font-medium">{profile?.current_weight || '--'} lbs</div>
                            </div>
                            <button
                                onClick={() => setShowProfileSetup(true)}
                                className="mt-4 bg-orange-500 hover:bg-orange-400 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Update Goals
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ProfileSetupModal userId={user.id} isOpen={showProfileSetup} onClose={() => setShowProfileSetup(false)} />
        </div>
    );
}
