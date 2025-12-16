import Link from 'next/link';

// Mock data for demonstration
const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const meals = [
    { type: 'Breakfast', foods: [], totals: { calories: 0, carbs: 0, fat: 0, protein: 0, sodium: 0, sugar: 0 } },
    { type: 'Lunch', foods: [], totals: { calories: 0, carbs: 0, fat: 0, protein: 0, sodium: 0, sugar: 0 } },
    { type: 'Dinner', foods: [], totals: { calories: 0, carbs: 0, fat: 0, protein: 0, sodium: 0, sugar: 0 } },
    { type: 'Snacks', foods: [], totals: { calories: 0, carbs: 0, fat: 0, protein: 0, sodium: 0, sugar: 0 } },
];

const dailyGoals = { calories: 2000, carbs: 250, fat: 67, protein: 100, sodium: 2300, sugar: 50 };

export default function FoodPage() {
    const totals = {
        calories: meals.reduce((sum, m) => sum + m.totals.calories, 0),
        carbs: meals.reduce((sum, m) => sum + m.totals.carbs, 0),
        fat: meals.reduce((sum, m) => sum + m.totals.fat, 0),
        protein: meals.reduce((sum, m) => sum + m.totals.protein, 0),
        sodium: meals.reduce((sum, m) => sum + m.totals.sodium, 0),
        sugar: meals.reduce((sum, m) => sum + m.totals.sugar, 0),
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-6">
                {/* Date Selector */}
                <div className="flex items-center justify-between mb-6">
                    <button className="text-[#0073CF] hover:underline">← Previous Day</button>
                    <h1 className="text-xl font-semibold text-gray-800">{todayDate}</h1>
                    <button className="text-[#0073CF] hover:underline">Next Day →</button>
                </div>

                {/* Food Diary Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-[#0073CF] text-white px-4 py-3">
                        <h2 className="font-semibold">Your Food Diary For:</h2>
                        <p className="text-sm text-blue-100">{todayDate}</p>
                    </div>

                    {/* Meals Table */}
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-4 py-2 font-medium text-gray-600"></th>
                                <th className="text-right px-2 py-2 font-medium text-gray-600">Calories</th>
                                <th className="text-right px-2 py-2 font-medium text-gray-600">Carbs</th>
                                <th className="text-right px-2 py-2 font-medium text-gray-600">Fat</th>
                                <th className="text-right px-2 py-2 font-medium text-gray-600">Protein</th>
                                <th className="text-right px-2 py-2 font-medium text-gray-600">Sodium</th>
                                <th className="text-right px-2 py-2 font-medium text-gray-600">Sugar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((meal) => (
                                <MealSection key={meal.type} meal={meal} />
                            ))}

                            {/* Totals Row */}
                            <tr className="bg-gray-50 border-t-2 border-gray-300 font-semibold">
                                <td className="px-4 py-3 text-gray-800">Totals</td>
                                <td className="text-right px-2 py-3">{totals.calories}</td>
                                <td className="text-right px-2 py-3">{totals.carbs}g</td>
                                <td className="text-right px-2 py-3">{totals.fat}g</td>
                                <td className="text-right px-2 py-3">{totals.protein}g</td>
                                <td className="text-right px-2 py-3">{totals.sodium}mg</td>
                                <td className="text-right px-2 py-3">{totals.sugar}g</td>
                            </tr>

                            {/* Daily Goal Row */}
                            <tr className="border-t border-gray-200">
                                <td className="px-4 py-2 text-gray-600">Your Daily Goal</td>
                                <td className="text-right px-2 py-2 text-gray-600">{dailyGoals.calories}</td>
                                <td className="text-right px-2 py-2 text-gray-600">{dailyGoals.carbs}g</td>
                                <td className="text-right px-2 py-2 text-gray-600">{dailyGoals.fat}g</td>
                                <td className="text-right px-2 py-2 text-gray-600">{dailyGoals.protein}g</td>
                                <td className="text-right px-2 py-2 text-gray-600">{dailyGoals.sodium}mg</td>
                                <td className="text-right px-2 py-2 text-gray-600">{dailyGoals.sugar}g</td>
                            </tr>

                            {/* Remaining Row */}
                            <tr className="border-t border-gray-200 font-semibold text-green-600">
                                <td className="px-4 py-2">Remaining</td>
                                <td className="text-right px-2 py-2">{dailyGoals.calories - totals.calories}</td>
                                <td className="text-right px-2 py-2">{dailyGoals.carbs - totals.carbs}g</td>
                                <td className="text-right px-2 py-2">{dailyGoals.fat - totals.fat}g</td>
                                <td className="text-right px-2 py-2">{dailyGoals.protein - totals.protein}g</td>
                                <td className="text-right px-2 py-2">{dailyGoals.sodium - totals.sodium}mg</td>
                                <td className="text-right px-2 py-2">{dailyGoals.sugar - totals.sugar}g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Water Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">💧</span>
                            <div>
                                <h3 className="font-semibold text-gray-800">Water Consumption</h3>
                                <p className="text-sm text-gray-500">0 of 8 cups</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {[...Array(8)].map((_, i) => (
                                <button key={i} className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-[#0073CF] hover:bg-blue-50 transition-colors">
                                    {i < 0 ? '💧' : ''}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex gap-4 justify-center">
                    <Link href="/dashboard" className="bg-[#0073CF] text-white px-6 py-2 rounded font-medium hover:bg-[#005AA7] transition-colors">
                        Complete Diary
                    </Link>
                    <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-300 transition-colors">
                        Print Preview
                    </button>
                </div>
            </div>
        </div>
    );
}

interface Meal {
    type: string;
    foods: Array<{ name: string; calories: number; carbs: number; fat: number; protein: number; sodium: number; sugar: number }>;
    totals: { calories: number; carbs: number; fat: number; protein: number; sodium: number; sugar: number };
}

function MealSection({ meal }: { meal: Meal }) {
    return (
        <>
            {/* Meal Header */}
            <tr className="bg-[#E8F4FC] border-t border-gray-200">
                <td colSpan={7} className="px-4 py-2">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">{meal.type}</span>
                        <div className="flex gap-4 text-sm">
                            <Link href={`/food/add?meal=${meal.type.toLowerCase()}`} className="text-[#0073CF] hover:underline">Add Food</Link>
                            <button className="text-[#0073CF] hover:underline">Quick Tools ▼</button>
                        </div>
                    </div>
                </td>
            </tr>

            {/* Foods in meal */}
            {meal.foods.length === 0 ? (
                <tr>
                    <td colSpan={7} className="px-4 py-3 text-gray-400 italic text-center">
                        No foods logged yet
                    </td>
                </tr>
            ) : (
                meal.foods.map((food, idx) => (
                    <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-800">{food.name}</td>
                        <td className="text-right px-2 py-2">{food.calories}</td>
                        <td className="text-right px-2 py-2">{food.carbs}g</td>
                        <td className="text-right px-2 py-2">{food.fat}g</td>
                        <td className="text-right px-2 py-2">{food.protein}g</td>
                        <td className="text-right px-2 py-2">{food.sodium}mg</td>
                        <td className="text-right px-2 py-2">{food.sugar}g</td>
                    </tr>
                ))
            )}

            {/* Meal totals */}
            <tr className="border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
                <td className="px-4 py-1 text-right">{meal.type} Totals:</td>
                <td className="text-right px-2 py-1">{meal.totals.calories}</td>
                <td className="text-right px-2 py-1">{meal.totals.carbs}g</td>
                <td className="text-right px-2 py-1">{meal.totals.fat}g</td>
                <td className="text-right px-2 py-1">{meal.totals.protein}g</td>
                <td className="text-right px-2 py-1">{meal.totals.sodium}mg</td>
                <td className="text-right px-2 py-1">{meal.totals.sugar}g</td>
            </tr>
        </>
    );
}
