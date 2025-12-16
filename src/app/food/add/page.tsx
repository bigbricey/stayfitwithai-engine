'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Common foods database (sample)
const commonFoods = [
    { name: 'Banana, medium', calories: 105, carbs: 27, fat: 0.4, protein: 1.3 },
    { name: 'Apple, medium', calories: 95, carbs: 25, fat: 0.3, protein: 0.5 },
    { name: 'Egg, large', calories: 78, carbs: 0.6, fat: 5, protein: 6 },
    { name: 'Chicken Breast, 4oz', calories: 165, carbs: 0, fat: 3.6, protein: 31 },
    { name: 'Brown Rice, 1 cup cooked', calories: 216, carbs: 45, fat: 1.8, protein: 5 },
    { name: 'Greek Yogurt, 6oz', calories: 100, carbs: 6, fat: 0.7, protein: 17 },
    { name: 'Oatmeal, 1 cup cooked', calories: 166, carbs: 28, fat: 3.6, protein: 5.9 },
    { name: 'Salmon, 4oz', calories: 233, carbs: 0, fat: 14, protein: 25 },
    { name: 'Broccoli, 1 cup', calories: 55, carbs: 11, fat: 0.6, protein: 3.7 },
    { name: 'Almonds, 1oz (23 nuts)', calories: 164, carbs: 6, fat: 14, protein: 6 },
];

function AddFoodForm() {
    const searchParams = useSearchParams();
    const meal = searchParams.get('meal') || 'breakfast';
    const mealDisplay = meal.charAt(0).toUpperCase() + meal.slice(1);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<typeof commonFoods>([]);
    const [selectedFood, setSelectedFood] = useState<typeof commonFoods[0] | null>(null);
    const [servings, setServings] = useState('1');
    const [message, setMessage] = useState('');

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setSearchResults(commonFoods.slice(0, 5));
            return;
        }
        const results = commonFoods.filter(food =>
            food.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleSelectFood = (food: typeof commonFoods[0]) => {
        setSelectedFood(food);
        setSearchResults([]);
    };

    const handleAddFood = () => {
        if (!selectedFood) {
            setMessage('Please select a food first');
            return;
        }

        // TODO: Save to Supabase meals table
        setMessage(`Added ${servings}x ${selectedFood.name} to ${mealDisplay}!`);
        setSelectedFood(null);
        setServings('1');
    };

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-6">
                <div className="mb-4">
                    <Link href="/food" className="text-[#0073CF] hover:underline">← Back to Food Diary</Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-5 py-4 border-b border-gray-100 bg-[#0073CF] rounded-t-lg">
                        <h1 className="text-xl font-semibold text-white">Add Food to {mealDisplay}</h1>
                    </div>

                    <div className="p-5">
                        {/* Search Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search for a food</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder="e.g., banana, chicken breast, rice..."
                                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:border-[#0073CF] focus:outline-none"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-[#0073CF] text-white px-4 py-2 rounded hover:bg-[#005AA7] transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Or <button onClick={() => setSearchResults(commonFoods)} className="text-[#0073CF] hover:underline">browse all common foods</button>
                            </p>
                        </div>

                        {/* Search Results */}
                        {searchResults.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-700 mb-2">Search Results</h3>
                                <div className="border border-gray-200 rounded max-h-60 overflow-y-auto">
                                    {searchResults.map((food, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectFood(food)}
                                            className="w-full text-left px-4 py-3 hover:bg-[#E8F4FC] border-b border-gray-100 last:border-b-0 flex justify-between items-center"
                                        >
                                            <span className="text-gray-800">{food.name}</span>
                                            <span className="text-gray-500 text-sm">{food.calories} cal</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Selected Food */}
                        {selectedFood && (
                            <div className="mb-6 p-4 bg-[#E8F4FC] rounded-lg border border-[#C5DCE9]">
                                <h3 className="font-medium text-gray-800 mb-3">Selected: {selectedFood.name}</h3>
                                <div className="grid grid-cols-4 gap-4 text-center text-sm mb-4">
                                    <div>
                                        <div className="text-gray-500">Calories</div>
                                        <div className="font-semibold">{Math.round(selectedFood.calories * parseFloat(servings || '1'))}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Carbs</div>
                                        <div className="font-semibold">{Math.round(selectedFood.carbs * parseFloat(servings || '1'))}g</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Fat</div>
                                        <div className="font-semibold">{Math.round(selectedFood.fat * parseFloat(servings || '1'))}g</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Protein</div>
                                        <div className="font-semibold">{Math.round(selectedFood.protein * parseFloat(servings || '1'))}g</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="text-sm text-gray-600">Number of servings:</label>
                                    <input
                                        type="number"
                                        min="0.25"
                                        step="0.25"
                                        value={servings}
                                        onChange={(e) => setServings(e.target.value)}
                                        className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Message */}
                        {message && (
                            <div className={`mb-4 p-3 rounded ${message.includes('Added') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message}
                            </div>
                        )}

                        {/* Add Button */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddFood}
                                disabled={!selectedFood}
                                className="bg-[#0073CF] text-white px-6 py-2 rounded font-medium hover:bg-[#005AA7] transition-colors disabled:opacity-50"
                            >
                                Add to {mealDisplay}
                            </button>
                            <Link
                                href="/food"
                                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Add Section */}
                <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Quick Add (Enter calories manually)</h2>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                placeholder="Calories"
                                className="w-32 border border-gray-300 rounded px-3 py-2"
                            />
                            <span className="text-gray-600">calories</span>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                                Quick Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AddFoodPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <AddFoodForm />
        </Suspense>
    );
}
