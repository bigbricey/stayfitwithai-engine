'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface FoodItem {
    fdcId: number;
    description: string;
    brandName?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    servingSize?: number;
    servingUnit?: string;
}

interface FoodSearchProps {
    userId: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    onFoodAdded?: () => void;
}

export default function FoodSearch({ userId, mealType, onFoodAdded }: FoodSearchProps) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [servings, setServings] = useState('1');

    const searchFood = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(searchQuery)}&pageSize=8&dataType=Foundation,SR%20Legacy&api_key=DEMO_KEY`
            );
            const data = await res.json();
            const foods: FoodItem[] = (data.foods || []).map((f: Record<string, unknown>) => {
                const nutrients = (f.foodNutrients as Array<{ nutrientName: string; value: number }>) || [];
                const getCal = nutrients.find(n => n.nutrientName === 'Energy')?.value || 0;
                const getPro = nutrients.find(n => n.nutrientName === 'Protein')?.value || 0;
                const getCarb = nutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0;
                const getFat = nutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0;
                return {
                    fdcId: f.fdcId as number,
                    description: f.description as string,
                    brandName: f.brandName as string | undefined,
                    calories: Math.round(getCal),
                    protein: Math.round(getPro),
                    carbs: Math.round(getCarb),
                    fat: Math.round(getFat),
                    servingSize: 100,
                    servingUnit: 'g'
                };
            });
            setResults(foods);
        } catch (err) {
            console.error('Food search error:', err);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => searchFood(query), 300);
        return () => clearTimeout(timer);
    }, [query, searchFood]);

    const handleAddFood = async () => {
        if (!selectedFood) return;
        const supabase = createClient();
        const multiplier = parseFloat(servings) || 1;
        const today = new Date().toISOString().split('T')[0];

        await supabase.from('meals').insert({
            user_id: userId,
            date: today,
            meal_type: mealType,
            description: selectedFood.description,
            calories: Math.round((selectedFood.calories || 0) * multiplier),
            protein: Math.round((selectedFood.protein || 0) * multiplier * 10) / 10,
            carbs: Math.round((selectedFood.carbs || 0) * multiplier * 10) / 10,
            fat: Math.round((selectedFood.fat || 0) * multiplier * 10) / 10,
        });

        setQuery('');
        setResults([]);
        setSelectedFood(null);
        setServings('1');
        onFoodAdded?.();
        router.refresh();
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search foods..."
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {loading && <div className="absolute right-3 top-3 text-slate-400 text-sm">...</div>}

            {results.length > 0 && !selectedFood && (
                <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl max-h-80 overflow-y-auto">
                    {results.map((food) => (
                        <button
                            key={food.fdcId}
                            onClick={() => setSelectedFood(food)}
                            className="w-full px-4 py-3 text-left hover:bg-slate-700 border-b border-slate-700 last:border-0 transition-colors"
                        >
                            <div className="text-white font-medium">{food.description}</div>
                            <div className="flex gap-4 text-sm text-slate-400 mt-1">
                                <span className="text-orange-400">{food.calories} cal</span>
                                <span>P: {food.protein}g</span>
                                <span>C: {food.carbs}g</span>
                                <span>F: {food.fat}g</span>
                                <span className="text-slate-500">per 100g</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {selectedFood && (
                <div className="mt-3 bg-slate-800/80 border border-orange-500/30 rounded-xl p-4">
                    <div className="text-white font-medium mb-3">{selectedFood.description}</div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-slate-400">Servings (100g each)</label>
                            <input
                                type="number"
                                step="0.5"
                                min="0.5"
                                value={servings}
                                onChange={(e) => setServings(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white mt-1"
                            />
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-400">
                                {Math.round((selectedFood.calories || 0) * (parseFloat(servings) || 1))}
                            </div>
                            <div className="text-xs text-slate-400">calories</div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => { setSelectedFood(null); setQuery(''); }}
                            className="flex-1 bg-slate-700 text-slate-300 py-2 rounded-lg hover:bg-slate-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddFood}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium py-2 rounded-lg hover:from-orange-400 hover:to-amber-400 transition-colors"
                        >
                            Add Food
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
