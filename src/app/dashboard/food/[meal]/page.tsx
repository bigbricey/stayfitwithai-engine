'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    SoloLevelingPage,
    SystemPanelWithHeader,
    SystemButton
} from '@/components/SoloLeveling';
import { NotificationManager } from '@/components/SoloLeveling/SystemNotification';
import { XPPopup } from '@/components/SoloLeveling/XPPopup';
import { ArrowLeft, Coffee, Sun, Moon, Cookie, Plus } from 'lucide-react';

const MEAL_ICONS: Record<string, any> = {
    breakfast: Coffee,
    lunch: Sun,
    dinner: Moon,
    snack: Cookie
};

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

export default function MealEntryPage() {
    const router = useRouter();
    const params = useParams();
    const mealType = params?.meal as string;

    const [mounted, setMounted] = useState(false);
    const [isPending, setIsPending] = useState(false);

    // Form State
    const [mealName, setMealName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');

    // Feedback State
    const [notifications, setNotifications] = useState<{ id: string; message: string; type?: 'info' | 'success' | 'warning' }[]>([]);
    const [xpPopups, setXpPopups] = useState<{ id: string; amount: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        // Validate meal type
        if (!['breakfast', 'lunch', 'dinner', 'snack'].includes(mealType)) {
            router.push('/dashboard/food');
        }
    }, [mealType, router]);

    const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
        const id = Date.now().toString();
        setNotifications(prev => [...prev, { id, message, type }]);
    };

    const showXPGain = (amount: number) => {
        const id = Date.now().toString();
        setXpPopups(prev => [...prev, { id, amount }]);
    };

    const handleSubmit = async () => {
        if (!calories) return;

        setIsPending(true);
        const calorieValue = parseInt(calories) || 0;
        const xpGain = Math.floor(calorieValue / 20) + 10; // More XP for logging!

        // Simulate save delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create Meal Object
        const newMeal: Meal = {
            id: Date.now().toString(),
            name: mealName || mealType.charAt(0).toUpperCase() + mealType.slice(1),
            calories: calorieValue,
            protein: parseInt(protein) || 0,
            carbs: parseInt(carbs) || 0,
            fat: parseInt(fat) || 0,
            meal_type: mealType,
            created_at: new Date().toISOString(),
        };

        // Save to LocalStorage (simple persistence)
        const saved = localStorage.getItem('stayfit_meals_today');
        let currentMeals = [];
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const today = new Date().toISOString().split('T')[0];
                if (parsed.date === today) {
                    currentMeals = parsed.meals || [];
                }
            } catch (e) {
                console.error(e);
            }
        }

        const updatedMeals = [...currentMeals, newMeal];
        localStorage.setItem('stayfit_meals_today', JSON.stringify({
            date: new Date().toISOString().split('T')[0],
            meals: updatedMeals
        }));

        // Show Feedback
        showXPGain(xpGain);
        showNotification(`${mealType.toUpperCase()} LOGGED SUCCESSFULLY`, 'success');

        // Return to dashboard after short delay
        setTimeout(() => {
            router.push('/dashboard/food');
        }, 1500);
    };

    if (!mounted) return null;

    const MealIcon = MEAL_ICONS[mealType] || Plus;

    return (
        <SoloLevelingPage>
            {/* XP Popups */}
            {xpPopups.map((popup) => (
                <XPPopup
                    key={popup.id}
                    amount={popup.amount}
                    onComplete={() => setXpPopups(prev => prev.filter(p => p.id !== popup.id))}
                />
            ))}

            <NotificationManager
                notifications={notifications}
                onRemove={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
            />

            <SystemPanelWithHeader
                title={`LOG ${mealType.toUpperCase()}`}
                icon={MealIcon}
                className="h-full"
                backButton={
                    <button
                        onClick={() => router.push('/dashboard/food')}
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] tracking-[0.2em] font-mono uppercase">BACK</span>
                    </button>
                }
            >
                <div className="space-y-8 mt-4">
                    {/* Input Fields */}
                    <div>
                        <label className="text-white text-xs tracking-[0.2em] uppercase mb-3 block font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">ITEM NAME</label>
                        <input
                            type="text"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            placeholder={`e.g. ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Item`}
                            autoFocus
                            className="w-full bg-black/40 border border-white/20 text-white px-6 py-4 placeholder-white/20 
                                focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all
                                text-lg tracking-wider"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <label className="text-white text-xs tracking-[0.2em] uppercase mb-3 block font-bold text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.5)]">CALORIES</label>
                            <input
                                type="number"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                placeholder="0"
                                className="w-full bg-black/40 border border-white/20 text-white text-center text-4xl font-bold px-6 py-4 placeholder-white/10 
                                    focus:border-orange-400 focus:outline-none focus:shadow-[0_0_20px_rgba(251,146,60,0.2)] transition-all"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1 grid grid-cols-3 gap-3">
                            <div className="flex flex-col gap-2">
                                <label className="text-white/60 text-[10px] tracking-wider uppercase text-center">PRO (g)</label>
                                <input
                                    type="number"
                                    value={protein}
                                    onChange={(e) => setProtein(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-black/40 border border-white/20 text-white text-center text-xl px-2 py-3
                                        focus:border-red-400 focus:outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/60 text-[10px] tracking-wider uppercase text-center">CARB (g)</label>
                                <input
                                    type="number"
                                    value={carbs}
                                    onChange={(e) => setCarbs(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-black/40 border border-white/20 text-white text-center text-xl px-2 py-3
                                        focus:border-yellow-400 focus:outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/60 text-[10px] tracking-wider uppercase text-center">FAT (g)</label>
                                <input
                                    type="number"
                                    value={fat}
                                    onChange={(e) => setFat(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-black/40 border border-white/20 text-white text-center text-xl px-2 py-3
                                        focus:border-blue-400 focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        <SystemButton
                            onClick={handleSubmit}
                            disabled={isPending || !calories}
                            className={!calories ? "opacity-50 grayscale" : "border-cyan-400 text-cyan-400"}
                        >
                            {isPending ? 'PROCESSING DATA...' : 'CONFIRM ENTRY'}
                        </SystemButton>
                    </div>
                </div>
            </SystemPanelWithHeader>
        </SoloLevelingPage>
    );
}
