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
    const [adding, setAdding] = useState(false);

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
        setAdding(true);
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
        setAdding(false);
        onFoodAdded?.();
        router.refresh();
    };

    return (
        <div className="relative">
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="🔍 Search foods to add..."
                    className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all outline-none"
                />
                {loading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Search Results Dropdown */}
            {results.length > 0 && !selectedFood && (
                <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-600/50 rounded-xl overflow-hidden shadow-2xl shadow-black/40 max-h-80 overflow-y-auto">
                    {results.map((food) => (
                        <button
                            key={food.fdcId}
                            onClick={() => setSelectedFood(food)}
                            className="w-full px-4 py-3 text-left hover:bg-slate-700/50 border-b border-slate-700/50 last:border-0 transition-colors"
                        >
                            <div className="text-white font-medium truncate">{food.description}</div>
                            <div className="flex gap-3 text-sm mt-1">
                                <span className="text-cyan-400 font-medium">{food.calories} cal</span>
                                <span className="text-slate-400">P: {food.protein}g</span>
                                <span className="text-slate-400">C: {food.carbs}g</span>
                                <span className="text-slate-400">F: {food.fat}g</span>
                                <span className="text-slate-500 ml-auto">per 100g</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Selected Food Card */}
            {selectedFood && (
                <div className="mt-3 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="text-white font-medium mb-3 truncate">{selectedFood.description}</div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-slate-400 block mb-1">Servings (100g each)</label>
                            <input
                                type="number"
                                step="0.5"
                                min="0.5"
                                value={servings}
                                onChange={(e) => setServings(e.target.value)}
                                className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
                            />
                        </div>
                        <div className="text-center px-4">
                            <div className="text-3xl font-bold text-cyan-400">
                                {Math.round((selectedFood.calories || 0) * (parseFloat(servings) || 1))}
                            </div>
                            <div className="text-xs text-slate-400">calories</div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => { setSelectedFood(null); setQuery(''); }}
                            className="flex-1 bg-slate-700/50 text-slate-300 py-2.5 rounded-xl hover:bg-slate-600/50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddFood}
                            disabled={adding}
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-2.5 rounded-xl hover:from-cyan-400 hover:to-purple-400 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
                        >
                            {adding ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Adding...
                                </span>
                            ) : (
                                'Add Food ✓'
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
