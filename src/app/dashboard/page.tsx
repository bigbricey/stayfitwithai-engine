'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    SoloLevelingLayout,
    SystemPanel,
    SystemPanelWithHeader,
    GlowNumber,
    VitalBar,
    SystemButton
} from '@/components/SoloLeveling';
import { saveMeal, getTodaysMeals } from '@/lib/actions/meals';
import {
    ArrowLeft,
    Utensils,
    Apple,
    Flame,
    Beef,
    Wheat,
    Droplet,
    Plus,
    Coffee,
    Sun,
    Moon,
    Cookie,
    Check
} from 'lucide-react';

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

const mealTypes = [
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'lunch', label: 'Lunch', icon: Sun },
    { id: 'dinner', label: 'Dinner', icon: Moon },
    { id: 'snack', label: 'Snack', icon: Cookie },
] as const;

export default function Dashboard() {
    const router = useRouter();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Form state
    const [selectedType, setSelectedType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
    const [mealName, setMealName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');

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

    const totals = meals.reduce((acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    const handleSubmit = async () => {
        if (!calories) return;

        startTransition(async () => {
            try {
                await saveMeal({
                    name: mealName || selectedType,
                    calories: parseInt(calories) || 0,
                    protein: parseInt(protein) || 0,
                    carbs: parseInt(carbs) || 0,
                    fat: parseInt(fat) || 0,
                    meal_type: selectedType,
                });
                await loadMeals();
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2000);
                // Reset form
                setMealName('');
                setCalories('');
                setProtein('');
                setCarbs('');
                setFat('');
            } catch (error) {
                console.error('Error saving meal:', error);
            }
        });
    };

    if (!mounted) return null;

    return (
        <SoloLevelingLayout>
            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="border border-green-400/50 bg-green-500/20 text-white px-6 py-3 flex items-center gap-2"
                        style={{ textShadow: '0 0 10px rgba(74,222,128,0.8)' }}>
                        <Check className="w-5 h-5" />
                        <span className="font-bold tracking-wider">+XP EARNED!</span>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="border-b border-white/20 p-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="w-10 h-10 border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </button>
                    <div className="flex items-center gap-3">
                        <Utensils className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
                        <h1 className="text-white font-bold text-xl tracking-[0.15em] uppercase"
                            style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                            FUEL TRACKER
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-4 space-y-4">

                {/* Daily Stats Panel */}
                <SystemPanelWithHeader title="DAILY STATS" icon={Flame}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <Flame className="w-8 h-8 mx-auto text-orange-400 mb-2" style={{ filter: 'drop-shadow(0 0 8px rgba(251,146,60,0.6))' }} />
                            <GlowNumber value={totals.calories} size="lg" />
                            <p className="text-white/50 text-xs mt-1 tracking-wider">CALORIES</p>
                        </div>
                        <div className="text-center">
                            <Beef className="w-8 h-8 mx-auto text-red-400 mb-2" style={{ filter: 'drop-shadow(0 0 8px rgba(248,113,113,0.6))' }} />
                            <GlowNumber value={totals.protein} size="lg" />
                            <p className="text-white/50 text-xs mt-1 tracking-wider">PROTEIN</p>
                        </div>
                        <div className="text-center">
                            <Wheat className="w-8 h-8 mx-auto text-yellow-400 mb-2" style={{ filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.6))' }} />
                            <GlowNumber value={totals.carbs} size="lg" />
                            <p className="text-white/50 text-xs mt-1 tracking-wider">CARBS</p>
                        </div>
                        <div className="text-center">
                            <Droplet className="w-8 h-8 mx-auto text-blue-400 mb-2" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.6))' }} />
                            <GlowNumber value={totals.fat} size="lg" />
                            <p className="text-white/50 text-xs mt-1 tracking-wider">FAT</p>
                        </div>
                    </div>
                </SystemPanelWithHeader>

                {/* Log Meal Panel */}
                <SystemPanelWithHeader title="LOG MEAL" icon={Plus}>
                    {/* Meal Type Selector */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {mealTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`py-3 border text-center transition-all ${selectedType === type.id
                                        ? 'border-white/80 bg-white/10 text-white'
                                        : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
                                    }`}
                            >
                                <type.icon className="w-5 h-5 mx-auto mb-1" />
                                <span className="text-xs tracking-wider uppercase">{type.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-white/50 text-xs tracking-wider uppercase mb-2 block">Meal Name (optional)</label>
                            <input
                                type="text"
                                value={mealName}
                                onChange={(e) => setMealName(e.target.value)}
                                placeholder="e.g. Grilled Chicken Salad"
                                className="w-full bg-transparent border border-white/30 text-white px-4 py-3 placeholder-white/30 focus:border-white/60 focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="text-white/50 text-xs tracking-wider uppercase mb-2 block">Calories</label>
                                <input
                                    type="number"
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent border border-white/30 text-white text-center text-2xl font-bold px-4 py-3 placeholder-white/30 focus:border-white/60 focus:outline-none"
                                    style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
                                />
                            </div>
                            <div>
                                <label className="text-white/50 text-xs tracking-wider uppercase mb-2 block">Protein (g)</label>
                                <input
                                    type="number"
                                    value={protein}
                                    onChange={(e) => setProtein(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent border border-white/30 text-white text-center text-xl px-4 py-3 placeholder-white/30 focus:border-white/60 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-white/50 text-xs tracking-wider uppercase mb-2 block">Carbs (g)</label>
                                <input
                                    type="number"
                                    value={carbs}
                                    onChange={(e) => setCarbs(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent border border-white/30 text-white text-center text-xl px-4 py-3 placeholder-white/30 focus:border-white/60 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-white/50 text-xs tracking-wider uppercase mb-2 block">Fat (g)</label>
                                <input
                                    type="number"
                                    value={fat}
                                    onChange={(e) => setFat(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent border border-white/30 text-white text-center text-xl px-4 py-3 placeholder-white/30 focus:border-white/60 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <SystemButton onClick={handleSubmit} className={isPending ? 'opacity-50' : ''}>
                            {isPending ? 'LOGGING...' : 'LOG MEAL'}
                        </SystemButton>
                    </div>
                </SystemPanelWithHeader>

                {/* Today's Meals */}
                {meals.length > 0 && (
                    <SystemPanelWithHeader title="TODAY'S LOG" icon={Apple}>
                        <div className="space-y-3">
                            {meals.map((meal) => (
                                <div key={meal.id} className="flex items-center justify-between border-b border-white/10 pb-3">
                                    <div>
                                        <p className="text-white font-medium">{meal.name}</p>
                                        <p className="text-white/40 text-xs uppercase tracking-wider">{meal.meal_type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold" style={{ textShadow: '0 0 8px rgba(255,255,255,0.5)' }}>
                                            {meal.calories} cal
                                        </p>
                                        <p className="text-white/40 text-xs">
                                            P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SystemPanelWithHeader>
                )}

                <p className="text-center text-white/30 text-xs tracking-[0.3em] py-4">
                    [ NUTRITION SYSTEM ONLINE ]
                </p>
            </div>
        </SoloLevelingLayout>
    );
}
