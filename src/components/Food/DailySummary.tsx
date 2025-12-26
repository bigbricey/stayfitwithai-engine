'use client';

import { Flame, Drumstick, Wheat, Droplets, TrendingUp } from 'lucide-react';

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

interface DailySummaryProps {
    meals: Meal[];
    date?: string;
}

export default function DailySummary({ meals, date }: DailySummaryProps) {
    const totals = meals.reduce(
        (acc, meal) => ({
            calories: acc.calories + (meal.calories || 0),
            protein: acc.protein + (meal.protein || 0),
            carbs: acc.carbs + (meal.carbs || 0),
            fat: acc.fat + (meal.fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const displayDate = date || new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });

    const macros = [
        {
            label: 'PROTEIN',
            value: totals.protein,
            unit: 'g',
            icon: Drumstick,
            color: 'from-red-500 to-rose-500',
            glow: 'shadow-red-500/50'
        },
        {
            label: 'CARBS',
            value: totals.carbs,
            unit: 'g',
            icon: Wheat,
            color: 'from-yellow-500 to-amber-500',
            glow: 'shadow-yellow-500/50'
        },
        {
            label: 'FAT',
            value: totals.fat,
            unit: 'g',
            icon: Droplets,
            color: 'from-blue-500 to-cyan-500',
            glow: 'shadow-blue-500/50'
        },
    ];

    return (
        <div className="relative">
            {/* Background glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 rounded-3xl blur-2xl" />

            <div className="relative bg-gray-900/80 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-sm text-gray-400 uppercase tracking-wider">Daily Stats</h2>
                        <p className="text-xl font-bold text-white">{displayDate}</p>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm font-medium">{meals.length} meals logged</span>
                    </div>
                </div>

                {/* Calories - Big Display */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl" />
                    <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-orange-500/30 rounded-2xl p-6 text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <Flame className="w-8 h-8 text-orange-400" />
                            <span className="text-sm font-medium text-orange-400 uppercase tracking-wider">Total Calories</span>
                        </div>
                        <div className="text-6xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                            {totals.calories.toLocaleString()}
                        </div>
                        <div className="text-gray-500 text-sm mt-1">kcal</div>
                    </div>
                </div>

                {/* Macro Breakdown */}
                <div className="grid grid-cols-3 gap-3">
                    {macros.map((macro) => (
                        <div
                            key={macro.label}
                            className="relative group"
                        >
                            <div className={`absolute -inset-1 bg-gradient-to-r ${macro.color} rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity`} />
                            <div className="relative bg-gray-800/80 border border-gray-700 rounded-xl p-4 text-center">
                                <macro.icon className={`w-5 h-5 mx-auto mb-2 bg-gradient-to-r ${macro.color} bg-clip-text`}
                                    style={{ color: macro.label === 'PROTEIN' ? '#ef4444' : macro.label === 'CARBS' ? '#eab308' : '#3b82f6' }}
                                />
                                <div className="text-2xl font-bold text-white">
                                    {macro.value.toFixed(0)}
                                    <span className="text-sm text-gray-400 ml-1">{macro.unit}</span>
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                                    {macro.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Meals List */}
                {meals.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Today&apos;s Meals</h3>
                        <div className="space-y-2">
                            {meals.slice(-5).reverse().map((meal) => (
                                <div
                                    key={meal.id}
                                    className="flex items-center justify-between bg-gray-800/50 rounded-lg px-4 py-3"
                                >
                                    <div>
                                        <span className="text-white font-medium">{meal.name}</span>
                                        <span className="text-gray-500 text-sm ml-2">
                                            {meal.meal_type}
                                        </span>
                                    </div>
                                    <div className="text-orange-400 font-semibold">
                                        {meal.calories} kcal
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {meals.length === 0 && (
                    <div className="mt-6 text-center py-8">
                        <div className="text-4xl mb-3">🍽️</div>
                        <p className="text-gray-500">No meals logged yet today</p>
                        <p className="text-gray-600 text-sm">Start logging to track your macros!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
