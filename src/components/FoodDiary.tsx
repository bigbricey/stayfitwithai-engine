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

const mealIcons: Record<string, string> = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🍎'
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

                return (
                    <div key={type} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                        {/* Meal Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{mealIcons[type]}</span>
                                <span className="font-medium text-white capitalize">{type}</span>
                            </div>
                            <span className="text-orange-400 font-medium">{mealCals} cal</span>
                        </div>

                        {/* Foods in this meal */}
                        <div className="divide-y divide-slate-800">
                            {typeMeals.map((meal) => (
                                <div key={meal.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-800/30 transition-colors group">
                                    <div className="flex-1">
                                        <div className="text-white">{meal.description}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">
                                            P: {meal.protein || 0}g • C: {meal.carbs || 0}g • F: {meal.fat || 0}g
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-slate-400">{meal.calories || 0} cal</span>
                                        <button
                                            onClick={() => handleDelete(meal.id)}
                                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Food Search */}
                            <div className="p-4">
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
