import Link from 'next/link';

const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// Mock data
const cardioExercises: Array<{ name: string; minutes: number; calories: number }> = [];
const strengthExercises: Array<{ name: string; sets: number; reps: number; weight: number }> = [];

export default function ExercisePage() {
    const totalCardioMinutes = cardioExercises.reduce((sum, e) => sum + e.minutes, 0);
    const totalCaloriesBurned = cardioExercises.reduce((sum, e) => sum + e.calories, 0);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-6">
                {/* Date Selector */}
                <div className="flex items-center justify-between mb-6">
                    <button className="text-[#0073CF] hover:underline">← Previous Day</button>
                    <h1 className="text-xl font-semibold text-gray-800">{todayDate}</h1>
                    <button className="text-[#0073CF] hover:underline">Next Day →</button>
                </div>

                {/* Exercise Diary Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-[#0073CF] text-white px-4 py-3">
                        <h2 className="font-semibold">Your Exercise Diary For:</h2>
                        <p className="text-sm text-blue-100">{todayDate}</p>
                    </div>

                    {/* Cardiovascular Section */}
                    <div className="border-b border-gray-200">
                        <div className="bg-[#E8F4FC] px-4 py-2 flex items-center justify-between">
                            <span className="font-semibold text-gray-800">Cardiovascular</span>
                            <div className="flex gap-4 text-sm">
                                <Link href="/exercise/add?type=cardio" className="text-[#0073CF] hover:underline">Add Exercise</Link>
                                <button className="text-[#0073CF] hover:underline">Quick Tools ▼</button>
                            </div>
                        </div>

                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-2 font-medium text-gray-600">Exercise</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-600">Minutes</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-600">Calories Burned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cardioExercises.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-4 text-gray-400 italic text-center">
                                            No cardiovascular exercises logged yet
                                        </td>
                                    </tr>
                                ) : (
                                    cardioExercises.map((exercise, idx) => (
                                        <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-800">{exercise.name}</td>
                                            <td className="text-right px-4 py-2">{exercise.minutes}</td>
                                            <td className="text-right px-4 py-2">{exercise.calories}</td>
                                        </tr>
                                    ))
                                )}
                                <tr className="bg-gray-50 border-t border-gray-200 font-semibold">
                                    <td className="px-4 py-2 text-right">Totals:</td>
                                    <td className="text-right px-4 py-2">{totalCardioMinutes} minutes</td>
                                    <td className="text-right px-4 py-2">{totalCaloriesBurned}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Strength Training Section */}
                    <div>
                        <div className="bg-[#E8F4FC] px-4 py-2 flex items-center justify-between border-t border-gray-200">
                            <span className="font-semibold text-gray-800">Strength Training</span>
                            <div className="flex gap-4 text-sm">
                                <Link href="/exercise/add?type=strength" className="text-[#0073CF] hover:underline">Add Exercise</Link>
                                <button className="text-[#0073CF] hover:underline">Quick Tools ▼</button>
                            </div>
                        </div>

                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-2 font-medium text-gray-600">Exercise</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-600">Sets</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-600">Reps/Set</th>
                                    <th className="text-right px-4 py-2 font-medium text-gray-600">Weight/Set</th>
                                </tr>
                            </thead>
                            <tbody>
                                {strengthExercises.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-4 text-gray-400 italic text-center">
                                            No strength training exercises logged yet
                                        </td>
                                    </tr>
                                ) : (
                                    strengthExercises.map((exercise, idx) => (
                                        <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-2 text-gray-800">{exercise.name}</td>
                                            <td className="text-right px-4 py-2">{exercise.sets}</td>
                                            <td className="text-right px-4 py-2">{exercise.reps}</td>
                                            <td className="text-right px-4 py-2">{exercise.weight} lbs</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔥</span>
                            <div>
                                <h3 className="font-semibold text-gray-800">Calories Burned Today</h3>
                                <p className="text-2xl font-bold text-[#0073CF]">{totalCaloriesBurned}</p>
                            </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                            <p>{totalCardioMinutes} minutes of cardio</p>
                            <p>{strengthExercises.length} strength exercises</p>
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
