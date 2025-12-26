'use client';

import { useState } from 'react';
import { Plus, Utensils, Flame, Drumstick, Wheat, Droplets } from 'lucide-react';

interface FoodLogFormProps {
    onSubmit: (meal: {
        name: string;
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    }) => void;
    isLoading?: boolean;
}

const mealTypes = [
    { value: 'breakfast', label: '🌅 Breakfast', color: 'from-orange-500 to-yellow-500' },
    { value: 'lunch', label: '☀️ Lunch', color: 'from-green-500 to-emerald-500' },
    { value: 'dinner', label: '🌙 Dinner', color: 'from-purple-500 to-indigo-500' },
    { value: 'snack', label: '🍿 Snack', color: 'from-pink-500 to-rose-500' },
] as const;

export default function FoodLogForm({ onSubmit, isLoading }: FoodLogFormProps) {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSubmit({
            name: name.trim(),
            calories: parseInt(calories) || 0,
            protein: parseFloat(protein) || 0,
            carbs: parseFloat(carbs) || 0,
            fat: parseFloat(fat) || 0,
            meal_type: mealType,
        });

        // Reset form
        setName('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFat('');
    };

    return (
        <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />

            <form
                onSubmit={handleSubmit}
                className="relative bg-gray-900/90 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm"
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl">
                        <Utensils className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        LOG MEAL
                    </h2>
                </div>

                {/* Meal Type Selector */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                    {mealTypes.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => setMealType(type.value)}
                            className={`
                p-3 rounded-xl text-sm font-medium transition-all duration-300
                ${mealType === type.value
                                    ? `bg-gradient-to-r ${type.color} text-white shadow-lg shadow-cyan-500/25 scale-105`
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                }
              `}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Food Name */}
                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">What did you eat?</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Grilled chicken with rice"
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        required
                    />
                </div>

                {/* Macro Inputs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Calories */}
                    <div className="col-span-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Flame className="w-4 h-4 text-orange-400" />
                            Calories
                        </label>
                        <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder="0"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-2xl font-bold text-center placeholder-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all"
                        />
                    </div>

                    {/* Protein */}
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Drumstick className="w-4 h-4 text-red-400" />
                            Protein (g)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                            placeholder="0"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-lg font-semibold text-center placeholder-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all"
                        />
                    </div>

                    {/* Carbs */}
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Wheat className="w-4 h-4 text-yellow-400" />
                            Carbs (g)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={carbs}
                            onChange={(e) => setCarbs(e.target.value)}
                            placeholder="0"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-lg font-semibold text-center placeholder-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                        />
                    </div>

                    {/* Fat */}
                    <div className="col-span-2">
                        <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Droplets className="w-4 h-4 text-blue-400" />
                            Fat (g)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={fat}
                            onChange={(e) => setFat(e.target.value)}
                            placeholder="0"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-lg font-semibold text-center placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || !name.trim()}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg rounded-xl 
            hover:from-cyan-400 hover:to-purple-400 hover:shadow-lg hover:shadow-cyan-500/25 
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    {isLoading ? 'SAVING...' : 'LOG MEAL'}
                </button>
            </form>
        </div>
    );
}
