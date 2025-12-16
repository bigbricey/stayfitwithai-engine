'use client';

import Link from 'next/link';

export default function Home() {
  // Mock data
  const calorieGoal = 2000;
  const foodCalories = 0;
  const exerciseCalories = 0;
  const remaining = calorieGoal - foodCalories + exerciseCalories;

  const macros = {
    carbs: { current: 0, goal: 250 },
    fat: { current: 0, goal: 67 },
    protein: { current: 0, goal: 100 },
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Today Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            {/* Today Text */}
            <h1 className="text-2xl font-semibold text-gray-800">Today</h1>
          </div>

          {/* Streak Counter */}
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-800">1</div>
            <div className="text-xs text-gray-500 uppercase leading-tight">Day<br />Streak</div>
          </div>
        </div>

        {/* Cards Row */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Calories Card */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Calories</h2>
            <p className="text-sm text-gray-500 mb-5">Remaining = Goal - Food + Exercise</p>

            <div className="flex items-center gap-6">
              {/* Calorie Ring */}
              <div className="relative flex-shrink-0">
                <svg width="130" height="130" className="transform -rotate-90">
                  {/* Background ring */}
                  <circle
                    cx="65" cy="65" r="55"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="65" cy="65" r="55"
                    stroke="#3B9FD8"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 55}
                    strokeDashoffset={0}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">{remaining}</span>
                  <span className="text-xs text-gray-500">Remaining</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-500">Base Goal</div>
                    <div className="font-medium text-gray-800">{calorieGoal}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-500">Food</div>
                    <div className="font-medium text-gray-800">{foodCalories}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-500">Exercise</div>
                    <div className="font-medium text-gray-800">{exerciseCalories}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Macros Card */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Macros</h2>

            {/* Three Macro Rings */}
            <div className="flex justify-around mb-4">
              <MacroRing
                label="Carbohydrates"
                current={macros.carbs.current}
                goal={macros.carbs.goal}
                color="#4ECDC4"
              />
              <MacroRing
                label="Fat"
                current={macros.fat.current}
                goal={macros.fat.goal}
                color="#FF6B6B"
              />
              <MacroRing
                label="Protein"
                current={macros.protein.current}
                goal={macros.protein.goal}
                color="#45B7D1"
              />
            </div>

            {/* Go Premium Button */}
            <button className="w-full bg-[#FFD700] hover:bg-[#FFC800] text-gray-800 font-semibold py-2.5 rounded flex items-center justify-center gap-2 transition-colors">
              <span>👑</span>
              <span>Go Premium</span>
            </button>
          </div>
        </div>

        {/* Ad Banner Placeholder */}
        <div className="mt-6 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-500">
          Advertisement
        </div>

      </div>
    </div>
  );
}

function MacroRing({ label, current, goal, color }: { label: string; current: number; goal: number; color: string }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const progress = goal > 0 ? current / goal : 0;
  const offset = circumference * (1 - progress);

  return (
    <div className="text-center">
      <div className="relative inline-block">
        <svg width="90" height="90" className="transform -rotate-90">
          <circle
            cx="45" cy="45" r={radius}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="45" cy="45" r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{current}</span>
          <span className="text-xs text-gray-400">/{goal}g</span>
        </div>
      </div>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
    </div>
  );
}
