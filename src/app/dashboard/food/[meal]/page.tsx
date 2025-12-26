'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    SoloLevelingPage,
    SystemPanelWithHeader,
    SystemButton
} from '@/components/SoloLeveling';
import { NotificationManager } from '@/components/SoloLeveling/SystemNotification';
import { XPPopup } from '@/components/SoloLeveling/XPPopup';
import { ArrowLeft, Coffee, Sun, Moon, Cookie, Plus, Search, Loader2 } from 'lucide-react';
import { saveMeal } from '@/lib/actions/meals';

const MEAL_ICONS: Record<string, any> = {
    breakfast: Coffee,
    lunch: Sun,
    dinner: Moon,
    snack: Cookie
};

interface NutritionResult {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fdcId: number;
}

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
    const [isSearching, setIsSearching] = useState(false);

    // Form State
    const [mealName, setMealName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');

    // Search Results
    const [searchResults, setSearchResults] = useState<NutritionResult[]>([]);
    const [showResults, setShowResults] = useState(false);

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

    // Debounced nutrition search
    useEffect(() => {
        if (!mealName || mealName.length < 2) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const controller = new AbortController();
        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                const res = await fetch(`/api/nutrition?q=${encodeURIComponent(mealName)}`, {
                    signal: controller.signal
                });
                if (res.ok) {
                    const data = await res.json();
                    setSearchResults(data.results || []);
                    setShowResults(true);
                }
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    console.error('Search error:', err);
                }
            } finally {
                setIsSearching(false);
            }
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [mealName]);

    const selectFood = (food: NutritionResult) => {
        setMealName(food.name);
        setCalories(food.calories.toString());
        setProtein(food.protein.toString());
        setCarbs(food.carbs.toString());
        setFat(food.fat.toString());
        setShowResults(false);
        showNotification('NUTRITION DATA LOADED', 'info');
    };

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
        const xpGain = Math.floor(calorieValue / 20) + 10;

        try {
            // Save to Supabase
            await saveMeal({
                name: mealName || mealType.charAt(0).toUpperCase() + mealType.slice(1),
                calories: calorieValue,
                protein: parseInt(protein) || 0,
                carbs: parseInt(carbs) || 0,
                fat: parseInt(fat) || 0,
                meal_type: mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
            });

            // Show Feedback
            showXPGain(xpGain);
            showNotification(`${mealType.toUpperCase()} LOGGED SUCCESSFULLY`, 'success');

            // Return to dashboard after short delay
            setTimeout(() => {
                router.push('/dashboard/food');
            }, 1500);
        } catch (error) {
            console.error('Save error:', error);
            showNotification('SAVE FAILED - TRY AGAIN', 'warning');
            setIsPending(false);
        }
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
                <div className="space-y-6 mt-4">
                    {/* Search Input with Autocomplete */}
                    <div className="relative">
                        <label className="text-white text-xs tracking-[0.2em] uppercase mb-3 block font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                            SEARCH FOOD
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={mealName}
                                onChange={(e) => setMealName(e.target.value)}
                                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                                placeholder="Type to search (e.g. grilled chicken)"
                                autoFocus
                                className="w-full bg-black/40 border border-white/20 text-white px-6 py-4 pr-12 placeholder-white/30 
                                    focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all
                                    text-lg tracking-wider"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                {isSearching ? (
                                    <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                                ) : (
                                    <Search className="w-5 h-5 text-white/40" />
                                )}
                            </div>
                        </div>

                        {/* Search Results Dropdown */}
                        {showResults && searchResults.length > 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-black/95 border border-cyan-400/50 max-h-48 overflow-y-auto">
                                {searchResults.slice(0, 5).map((food, idx) => (
                                    <button
                                        key={food.fdcId || idx}
                                        onClick={() => selectFood(food)}
                                        className="w-full px-4 py-3 text-left hover:bg-cyan-400/20 border-b border-white/10 last:border-0 transition-colors"
                                    >
                                        <div className="text-white text-sm truncate">{food.name}</div>
                                        <div className="text-white/50 text-xs mt-1">
                                            {food.calories} cal • {food.protein}g P • {food.carbs}g C • {food.fat}g F
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Macro Display */}
                    <div className="grid grid-cols-4 gap-3">
                        <div className="text-center">
                            <label className="text-orange-400 text-[10px] tracking-wider uppercase block mb-2 font-bold">CAL</label>
                            <input
                                type="number"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                placeholder="0"
                                className="w-full bg-black/40 border border-orange-400/50 text-white text-center text-2xl font-bold px-2 py-3
                                    focus:border-orange-400 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="text-center">
                            <label className="text-red-400 text-[10px] tracking-wider uppercase block mb-2 font-bold">PRO</label>
                            <input
                                type="number"
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                                placeholder="0"
                                className="w-full bg-black/40 border border-red-400/50 text-white text-center text-2xl px-2 py-3
                                    focus:border-red-400 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="text-center">
                            <label className="text-yellow-400 text-[10px] tracking-wider uppercase block mb-2 font-bold">CARB</label>
                            <input
                                type="number"
                                value={carbs}
                                onChange={(e) => setCarbs(e.target.value)}
                                placeholder="0"
                                className="w-full bg-black/40 border border-yellow-400/50 text-white text-center text-2xl px-2 py-3
                                    focus:border-yellow-400 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="text-center">
                            <label className="text-blue-400 text-[10px] tracking-wider uppercase block mb-2 font-bold">FAT</label>
                            <input
                                type="number"
                                value={fat}
                                onChange={(e) => setFat(e.target.value)}
                                placeholder="0"
                                className="w-full bg-black/40 border border-blue-400/50 text-white text-center text-2xl px-2 py-3
                                    focus:border-blue-400 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <p className="text-center text-white/40 text-xs">
                        Search auto-fills nutrition • Edit values if needed
                    </p>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <SystemButton
                            onClick={handleSubmit}
                            disabled={isPending || !calories}
                            className={!calories ? "opacity-50 grayscale" : "border-cyan-400 text-cyan-400"}
                        >
                            {isPending ? 'SAVING...' : 'LOG ENTRY'}
                        </SystemButton>
                    </div>
                </div>
            </SystemPanelWithHeader>
        </SoloLevelingPage>
    );
}
