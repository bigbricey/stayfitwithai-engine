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

    // Main calorie ring - ADHERENCE NEUTRAL: use cyan/blue, never red
    const radius = 85;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentUsed / 100) * circumference;

    // Macro goals (rough estimates)
    const proteinGoal = Math.round(dailyGoal * 0.25 / 4);
    const carbsGoal = Math.round(dailyGoal * 0.45 / 4);
    const fatGoal = Math.round(dailyGoal * 0.30 / 9);

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-xl">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

            <div className="relative p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Main Calorie Ring */}
                    <div className="relative flex-shrink-0">
                        <svg width="200" height="200" className="transform -rotate-90 drop-shadow-2xl">
                            {/* Background ring */}
                            <circle
                                cx="100" cy="100" r={radius}
                                stroke="rgba(100, 116, 139, 0.2)"
                                strokeWidth="14"
                                fill="none"
                            />
                            {/* Progress ring - cyan to purple gradient (NEVER red) */}
                            <circle
                                cx="100" cy="100" r={radius}
                                stroke="url(#calorieGradientPremium)"
                                strokeWidth="14"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-1000 ease-out"
                                style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' }}
                            />
                            <defs>
                                <linearGradient id="calorieGradientPremium" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="50%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#d946ef" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-white tracking-tight">
                                {Math.abs(remaining)}
                            </span>
                            <span className="text-sm font-medium text-slate-400 mt-1">
                                {remaining >= 0 ? 'remaining' : 'over goal'}
                            </span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 w-full space-y-6">
                        {/* Calorie Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                            <StatCard
                                label="Goal"
                                value={dailyGoal}
                                color="text-slate-300"
                                icon="🎯"
                            />
                            <StatCard
                                label="Food"
                                value={caloriesEaten}
                                color="text-cyan-400"
                                icon="🍽️"
                            />
                            <StatCard
                                label="Exercise"
                                value={caloriesBurned}
                                color="text-purple-400"
                                icon="🔥"
                            />
                        </div>

                        {/* Macro Bars */}
                        <div className="space-y-3">
                            <MacroBar
                                label="Protein"
                                current={protein}
                                goal={proteinGoal}
                                colorFrom="from-rose-500"
                                colorTo="to-pink-500"
                                icon="💪"
                            />
                            <MacroBar
                                label="Carbs"
                                current={carbs}
                                goal={carbsGoal}
                                colorFrom="from-amber-500"
                                colorTo="to-yellow-400"
                                icon="⚡"
                            />
                            <MacroBar
                                label="Fat"
                                current={fat}
                                goal={fatGoal}
                                colorFrom="from-cyan-500"
                                colorTo="to-teal-400"
                                icon="🥑"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
    return (
        <div className="bg-slate-800/50 rounded-2xl p-4 text-center border border-slate-700/50 hover:border-slate-600/50 transition-colors">
            <div className="text-lg mb-1">{icon}</div>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{label}</div>
        </div>
    );
}

function MacroBar({ label, current, goal, colorFrom, colorTo, icon }: {
    label: string;
    current: number;
    goal: number;
    colorFrom: string;
    colorTo: string;
    icon: string;
}) {
    const percent = Math.min((current / goal) * 100, 100);
    return (
        <div className="group">
            <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400 flex items-center gap-2">
                    <span>{icon}</span>
                    <span>{label}</span>
                </span>
                <span className="text-white font-medium">{current}<span className="text-slate-500">/{goal}g</span></span>
            </div>
            <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${colorFrom} ${colorTo} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
