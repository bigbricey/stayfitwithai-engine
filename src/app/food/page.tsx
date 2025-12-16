'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface FoodItem {
    fdcId: number;
    name: string;
    brand: string | null;
    servingSize: number;
    servingUnit: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    sugar: number;
    sodium: number;
}

interface LoggedFood {
    id: string;
    name: string;
    brand?: string;
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
    servings: number;
    servingSize: string;
    mealType: string;
}

const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

// Get formatted date
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

export default function FoodPage() {
    const [activeTab, setActiveTab] = useState<'search' | 'recent' | 'frequent' | 'myfoods'>('search');
    const [activeMeal, setActiveMeal] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [servings, setServings] = useState('1');
    const [loggedFoods, setLoggedFoods] = useState<Record<string, LoggedFood[]>>({
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snacks: [],
    });
    const [recentFoods, setRecentFoods] = useState<FoodItem[]>([]);
    const [message, setMessage] = useState('');

    // Load recent foods from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('recentFoods');
        if (saved) {
            setRecentFoods(JSON.parse(saved));
        }

        const savedLogs = localStorage.getItem('loggedFoods');
        if (savedLogs) {
            setLoggedFoods(JSON.parse(savedLogs));
        }
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setMessage('');

        try {
            const response = await fetch(`/api/food/search?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSearchResults(data.foods || []);
            if (data.foods?.length === 0) {
                setMessage('No foods found. Try a different search.');
            }
        } catch {
            setMessage('Error searching foods');
        }

        setIsSearching(false);
    };

    const handleSelectFood = (food: FoodItem) => {
        setSelectedFood(food);
        setServings('1');
    };

    const handleLogFood = () => {
        if (!selectedFood || !activeMeal) return;

        const servingMultiplier = parseFloat(servings) || 1;
        const newFood: LoggedFood = {
            id: `${selectedFood.fdcId}-${Date.now()}`,
            name: selectedFood.name,
            brand: selectedFood.brand || undefined,
            calories: Math.round(selectedFood.calories * servingMultiplier),
            carbs: Math.round(selectedFood.carbs * servingMultiplier),
            fat: Math.round(selectedFood.fat * servingMultiplier),
            protein: Math.round(selectedFood.protein * servingMultiplier),
            servings: servingMultiplier,
            servingSize: `${selectedFood.servingSize}${selectedFood.servingUnit}`,
            mealType: activeMeal,
        };

        // Add to logged foods
        const updatedLogs = {
            ...loggedFoods,
            [activeMeal]: [...loggedFoods[activeMeal], newFood],
        };
        setLoggedFoods(updatedLogs);
        localStorage.setItem('loggedFoods', JSON.stringify(updatedLogs));

        // Add to recent foods
        const updatedRecent = [selectedFood, ...recentFoods.filter(f => f.fdcId !== selectedFood.fdcId)].slice(0, 20);
        setRecentFoods(updatedRecent);
        localStorage.setItem('recentFoods', JSON.stringify(updatedRecent));

        // Reset
        setSelectedFood(null);
        setSearchQuery('');
        setSearchResults([]);
        setActiveMeal(null);
        setMessage(`Added ${newFood.name} to ${activeMeal}!`);

        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
    };

    const handleDeleteFood = (meal: string, foodId: string) => {
        const updatedLogs = {
            ...loggedFoods,
            [meal]: loggedFoods[meal].filter(f => f.id !== foodId),
        };
        setLoggedFoods(updatedLogs);
        localStorage.setItem('loggedFoods', JSON.stringify(updatedLogs));
    };

    const calculateMealTotals = (meal: string) => {
        return loggedFoods[meal].reduce(
            (acc, food) => ({
                calories: acc.calories + food.calories,
                carbs: acc.carbs + food.carbs,
                fat: acc.fat + food.fat,
                protein: acc.protein + food.protein,
            }),
            { calories: 0, carbs: 0, fat: 0, protein: 0 }
        );
    };

    const dailyTotals = meals.reduce(
        (acc, meal) => {
            const mealTotals = calculateMealTotals(meal);
            return {
                calories: acc.calories + mealTotals.calories,
                carbs: acc.carbs + mealTotals.carbs,
                fat: acc.fat + mealTotals.fat,
                protein: acc.protein + mealTotals.protein,
            };
        },
        { calories: 0, carbs: 0, fat: 0, protein: 0 }
    );

    const dailyGoals = { calories: 2000, carbs: 250, fat: 67, protein: 100 };

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-4">
                {/* Success Message */}
                {message && (
                    <div className="mb-4 px-4 py-3 bg-green-100 border border-green-300 text-green-700 rounded">
                        {message}
                    </div>
                )}

                {/* Blue Header Bar */}
                <div className="bg-[#0073CF] text-white px-4 py-3 rounded-t-lg">
                    <div className="font-medium">Your Food Diary For:</div>
                    <div className="text-sm text-blue-100">{formattedDate}</div>
                </div>

                {/* Food Diary Table */}
                <div className="bg-white border border-gray-200 rounded-b-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <tbody>
                            {meals.map((meal) => (
                                <MealSection
                                    key={meal}
                                    mealName={meal}
                                    foods={loggedFoods[meal]}
                                    totals={calculateMealTotals(meal)}
                                    isAddingFood={activeMeal === meal}
                                    onAddFoodClick={() => setActiveMeal(activeMeal === meal ? null : meal)}
                                    onDeleteFood={(id) => handleDeleteFood(meal, id)}
                                />
                            ))}

                            {/* Totals Row */}
                            <tr className="bg-gray-100 font-semibold border-t-2 border-gray-300">
                                <td className="px-4 py-2 text-gray-800">Totals</td>
                                <td className="text-center py-2">{dailyTotals.calories}</td>
                                <td className="text-center py-2">{dailyTotals.carbs}g</td>
                                <td className="text-center py-2">{dailyTotals.fat}g</td>
                                <td className="text-center py-2">{dailyTotals.protein}g</td>
                                <td></td>
                            </tr>

                            {/* Daily Goal Row */}
                            <tr className="border-t border-gray-200">
                                <td className="px-4 py-2 text-gray-600">Your Daily Goal</td>
                                <td className="text-center py-2 text-gray-600">{dailyGoals.calories}</td>
                                <td className="text-center py-2 text-gray-600">{dailyGoals.carbs}g</td>
                                <td className="text-center py-2 text-gray-600">{dailyGoals.fat}g</td>
                                <td className="text-center py-2 text-gray-600">{dailyGoals.protein}g</td>
                                <td></td>
                            </tr>

                            {/* Remaining Row */}
                            <tr className={`border-t border-gray-200 font-semibold ${dailyGoals.calories - dailyTotals.calories >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                <td className="px-4 py-2">Remaining</td>
                                <td className="text-center py-2">{dailyGoals.calories - dailyTotals.calories}</td>
                                <td className="text-center py-2">{dailyGoals.carbs - dailyTotals.carbs}g</td>
                                <td className="text-center py-2">{dailyGoals.fat - dailyTotals.fat}g</td>
                                <td className="text-center py-2">{dailyGoals.protein - dailyTotals.protein}g</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Add Food Panel (Inline) */}
                {activeMeal && (
                    <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="px-4 py-3 bg-[#0073CF] text-white rounded-t-lg flex justify-between items-center">
                            <h3 className="font-medium">Add Food to {activeMeal}</h3>
                            <button onClick={() => setActiveMeal(null)} className="text-white hover:text-gray-200">✕</button>
                        </div>

                        <div className="p-4">
                            {/* Tabs */}
                            <div className="flex gap-1 mb-4 border-b border-gray-200">
                                {(['search', 'recent', 'frequent', 'myfoods'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${activeTab === tab
                                                ? 'border-[#0073CF] text-[#0073CF]'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {tab === 'search' ? 'Search' : tab === 'recent' ? 'Recent' : tab === 'frequent' ? 'Frequent' : 'My Foods'}
                                    </button>
                                ))}
                            </div>

                            {/* Search Tab */}
                            {activeTab === 'search' && (
                                <div>
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                            placeholder="Search any food..."
                                            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:border-[#0073CF] focus:outline-none"
                                        />
                                        <button
                                            onClick={handleSearch}
                                            disabled={isSearching}
                                            className="bg-[#0073CF] text-white px-4 py-2 rounded hover:bg-[#005AA7] disabled:opacity-50"
                                        >
                                            {isSearching ? '...' : 'Search'}
                                        </button>
                                    </div>

                                    {/* Search Results */}
                                    {searchResults.length > 0 && !selectedFood && (
                                        <div className="border border-gray-200 rounded max-h-60 overflow-y-auto mb-4">
                                            {searchResults.map((food) => (
                                                <button
                                                    key={food.fdcId}
                                                    onClick={() => handleSelectFood(food)}
                                                    className="w-full text-left px-4 py-3 hover:bg-[#E8F4FC] border-b border-gray-100 last:border-b-0 flex justify-between"
                                                >
                                                    <div>
                                                        <div className="font-medium text-gray-800">{food.name}</div>
                                                        {food.brand && <div className="text-xs text-gray-500">{food.brand}</div>}
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium">{Math.round(food.calories)} cal</div>
                                                        <div className="text-xs text-gray-500">{food.servingSize}{food.servingUnit}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Selected Food */}
                                    {selectedFood && (
                                        <div className="p-4 bg-[#E8F4FC] rounded-lg border border-[#C5DCE9] mb-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h4 className="font-medium text-gray-800">{selectedFood.name}</h4>
                                                    {selectedFood.brand && <p className="text-xs text-gray-500">{selectedFood.brand}</p>}
                                                </div>
                                                <button onClick={() => setSelectedFood(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                                            </div>

                                            <div className="grid grid-cols-4 gap-2 text-center text-sm mb-4">
                                                <div>
                                                    <div className="text-gray-500 text-xs">Calories</div>
                                                    <div className="font-bold text-lg">{Math.round(selectedFood.calories * (parseFloat(servings) || 1))}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-500 text-xs">Carbs</div>
                                                    <div className="font-semibold">{Math.round(selectedFood.carbs * (parseFloat(servings) || 1))}g</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-500 text-xs">Fat</div>
                                                    <div className="font-semibold">{Math.round(selectedFood.fat * (parseFloat(servings) || 1))}g</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-500 text-xs">Protein</div>
                                                    <div className="font-semibold">{Math.round(selectedFood.protein * (parseFloat(servings) || 1))}g</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <label className="text-sm">Servings:</label>
                                                <input
                                                    type="number"
                                                    min="0.25"
                                                    step="0.25"
                                                    value={servings}
                                                    onChange={(e) => setServings(e.target.value)}
                                                    className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                                                />
                                                <span className="text-sm text-gray-500">({selectedFood.servingSize}{selectedFood.servingUnit} each)</span>
                                                <button
                                                    onClick={handleLogFood}
                                                    className="ml-auto bg-[#0073CF] text-white px-6 py-2 rounded font-medium hover:bg-[#005AA7]"
                                                >
                                                    Log Food
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Recent Tab */}
                            {activeTab === 'recent' && (
                                <div>
                                    {recentFoods.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">No recently logged foods yet.</p>
                                    ) : (
                                        <div className="border border-gray-200 rounded max-h-60 overflow-y-auto">
                                            {recentFoods.map((food) => (
                                                <button
                                                    key={food.fdcId}
                                                    onClick={() => handleSelectFood(food)}
                                                    className="w-full text-left px-4 py-3 hover:bg-[#E8F4FC] border-b border-gray-100 last:border-b-0 flex justify-between"
                                                >
                                                    <div>
                                                        <div className="font-medium text-gray-800">{food.name}</div>
                                                        {food.brand && <div className="text-xs text-gray-500">{food.brand}</div>}
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium">{Math.round(food.calories)} cal</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {selectedFood && (
                                        <div className="mt-4 p-4 bg-[#E8F4FC] rounded-lg border border-[#C5DCE9]">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-medium text-gray-800">{selectedFood.name}</h4>
                                                <button onClick={() => setSelectedFood(null)} className="text-gray-400">✕</button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <label className="text-sm">Servings:</label>
                                                <input
                                                    type="number"
                                                    min="0.25"
                                                    step="0.25"
                                                    value={servings}
                                                    onChange={(e) => setServings(e.target.value)}
                                                    className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                                                />
                                                <button
                                                    onClick={handleLogFood}
                                                    className="ml-auto bg-[#0073CF] text-white px-6 py-2 rounded font-medium hover:bg-[#005AA7]"
                                                >
                                                    Log Food
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Placeholder tabs */}
                            {activeTab === 'frequent' && (
                                <p className="text-gray-500 text-center py-8">Frequent foods will appear here as you log more meals.</p>
                            )}
                            {activeTab === 'myfoods' && (
                                <p className="text-gray-500 text-center py-8">Create custom foods to add them here.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface MealSectionProps {
    mealName: string;
    foods: LoggedFood[];
    totals: { calories: number; carbs: number; fat: number; protein: number };
    isAddingFood: boolean;
    onAddFoodClick: () => void;
    onDeleteFood: (id: string) => void;
}

function MealSection({ mealName, foods, totals, isAddingFood, onAddFoodClick, onDeleteFood }: MealSectionProps) {
    return (
        <>
            {/* Meal Header */}
            <tr className="bg-[#F6F6F6] border-t border-gray-200">
                <td className="px-4 py-2 font-semibold text-gray-800 w-1/3">{mealName}</td>
                <td className="text-center py-2 text-gray-600 text-xs w-[12%]">Calories</td>
                <td className="text-center py-2 text-gray-600 text-xs w-[12%]">Carbs</td>
                <td className="text-center py-2 text-gray-600 text-xs w-[12%]">Fat</td>
                <td className="text-center py-2 text-gray-600 text-xs w-[12%]">Protein</td>
                <td className="w-[8%]"></td>
            </tr>

            {/* Logged Foods */}
            {foods.length === 0 ? (
                <tr className="border-t border-gray-100">
                    <td colSpan={6} className="px-4 py-4 text-gray-400 italic text-center">
                        No foods logged for {mealName.toLowerCase()}
                    </td>
                </tr>
            ) : (
                foods.map((food) => (
                    <tr key={food.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-2">
                            <div className="text-gray-800">{food.name}</div>
                            <div className="text-xs text-gray-500">{food.servings} serving ({food.servingSize})</div>
                        </td>
                        <td className="text-center py-2">{food.calories}</td>
                        <td className="text-center py-2">{food.carbs}g</td>
                        <td className="text-center py-2">{food.fat}g</td>
                        <td className="text-center py-2">{food.protein}g</td>
                        <td className="text-center py-2">
                            <button
                                onClick={() => onDeleteFood(food.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                title="Delete"
                            >
                                ✕
                            </button>
                        </td>
                    </tr>
                ))
            )}

            {/* Add Food Row */}
            <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-4 py-2">
                    <button
                        onClick={onAddFoodClick}
                        className={`text-sm font-medium ${isAddingFood ? 'text-[#005AA7]' : 'text-[#0073CF] hover:underline'}`}
                    >
                        {isAddingFood ? '▼ Adding Food...' : '+ Add Food'}
                    </button>
                </td>
                <td className="text-center py-2 text-gray-600 font-medium">{totals.calories}</td>
                <td className="text-center py-2 text-gray-600">{totals.carbs}g</td>
                <td className="text-center py-2 text-gray-600">{totals.fat}g</td>
                <td className="text-center py-2 text-gray-600">{totals.protein}g</td>
                <td></td>
            </tr>
        </>
    );
}
