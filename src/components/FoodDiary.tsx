'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import FoodSearch from './FoodSearch';

interface Meal {
    id: string;
    meal_type: string;
    description?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
}

interface FoodDiaryProps {
    userId: string;
    meals: Meal[];
    onUpdate?: () => void;
}

const mealConfig = {
    breakfast: { icon: '🌅', label: 'Breakfast', time: 'Morning' },
    lunch: { icon: '☀️', label: 'Lunch', time: 'Midday' },
    dinner: { icon: '🌙', label: 'Dinner', time: 'Evening' },
    snack: { icon: '🍎', label: 'Snacks', time: 'Anytime' }
};

export default function FoodDiary({ userId, meals, onUpdate }: FoodDiaryProps) {
    const router = useRouter();
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

    const handleDelete = async (mealId: string) => {
        const supabase = createClient();
        await supabase.from('meals').delete().eq('id', mealId);
        onUpdate?.();
        router.refresh();
    };

    const getMealCalories = (type: string) => {
        return meals.filter(m => m.meal_type === type).reduce((sum, m) => sum + (m.calories || 0), 0);
    };

    return (
        <div className="space-y-4">
            {mealTypes.map((type) => {
                const typeMeals = meals.filter(m => m.meal_type === type);
                const mealCals = getMealCalories(type);
                const config = mealConfig[type];

                return (
                    <div
                        key={type}
                        className="group bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300"
                    >
                        {/* Meal Header */}
                        <div className="flex items-center justify-between px-5 py-4 bg-slate-800/30 border-b border-slate-700/30">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{config.icon}</span>
                                <div>
                                    <div className="font-semibold text-white">{config.label}</div>
                                    <div className="text-xs text-slate-500">{config.time}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-cyan-400">{mealCals}</div>
                                <div className="text-xs text-slate-500">calories</div>
                            </div>
                        </div>

                        {/* Foods in this meal */}
                        <div className="divide-y divide-slate-800/50">
                            {typeMeals.length === 0 && (
                                <div className="px-5 py-4 text-center text-slate-500 text-sm">
                                    No foods logged yet
                                </div>
                            )}

                            {typeMeals.map((meal) => (
                                <div
                                    key={meal.id}
                                    className="flex items-center justify-between px-5 py-3 hover:bg-slate-800/30 transition-colors group/item"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="text-white font-medium truncate">{meal.description || 'Unnamed food'}</div>
                                        <div className="flex gap-3 text-xs text-slate-500 mt-1">
                                            <span>P: {meal.protein || 0}g</span>
                                            <span>C: {meal.carbs || 0}g</span>
                                            <span>F: {meal.fat || 0}g</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 ml-4">
                                        <span className="text-slate-300 font-medium">{meal.calories || 0}</span>
                                        <button
                                            onClick={() => handleDelete(meal.id)}
                                            className="opacity-0 group-hover/item:opacity-100 w-7 h-7 flex items-center justify-center rounded-full bg-slate-700/50 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-all text-sm"
                                            title="Remove"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Food Search */}
                            <div className="p-4 bg-slate-900/30">
                                <FoodSearch
                                    userId={userId}
                                    mealType={type}
                                    onFoodAdded={onUpdate}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
