'use client';

interface CalorieBudgetProps {
    caloriesEaten: number;
    caloriesBurned: number;
    dailyGoal: number;
    protein: number;
    carbs: number;
    fat: number;
}

export default function CalorieBudget({
    caloriesEaten,
    caloriesBurned,
    dailyGoal,
    protein,
    carbs,
    fat
}: CalorieBudgetProps) {
    const netCalories = caloriesEaten - caloriesBurned;
    const remaining = dailyGoal - netCalories;
    const percentUsed = Math.min((netCalories / dailyGoal) * 100, 100);

    // Main calorie ring
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentUsed / 100) * circumference;

    // Macro goals (rough estimates)
    const proteinGoal = Math.round(dailyGoal * 0.25 / 4); // 25% from protein
    const carbsGoal = Math.round(dailyGoal * 0.45 / 4);   // 45% from carbs  
    const fatGoal = Math.round(dailyGoal * 0.30 / 9);     // 30% from fat

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Today&apos;s Nutrition</h2>
                <span className="text-sm text-slate-400">Goal: {dailyGoal} cal</span>
            </div>

            <div className="flex items-center justify-center gap-8">
                {/* Main Calorie Ring */}
                <div className="relative">
                    <svg width="200" height="200" className="transform -rotate-90">
                        <circle cx="100" cy="100" r={radius} stroke="#1e293b" strokeWidth="16" fill="none" />
                        <circle
                            cx="100" cy="100" r={radius}
                            stroke="url(#calorieGradient)" strokeWidth="16" fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-700 ease-out"
                        />
                        <defs>
                            <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#22c55e" />
                                <stop offset="50%" stopColor="#f97316" />
                                <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.abs(remaining)}
                        </span>
                        <span className="text-sm text-slate-400">
                            {remaining >= 0 ? 'remaining' : 'over'}
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div>
                            <div className="text-2xl font-bold text-white">{caloriesEaten}</div>
                            <div className="text-xs text-slate-400">Eaten</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div>
                            <div className="text-2xl font-bold text-white">{caloriesBurned}</div>
                            <div className="text-xs text-slate-400">Burned</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Macro Bars */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <MacroBar label="Protein" current={protein} goal={proteinGoal} color="bg-red-500" />
                <MacroBar label="Carbs" current={carbs} goal={carbsGoal} color="bg-blue-500" />
                <MacroBar label="Fat" current={fat} goal={fatGoal} color="bg-yellow-500" />
            </div>
        </div>
    );
}

function MacroBar({ label, current, goal, color }: { label: string; current: number; goal: number; color: string }) {
    const percent = Math.min((current / goal) * 100, 100);
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-white font-medium">{current}/{goal}g</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
}
