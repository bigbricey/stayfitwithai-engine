'use client';

import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock weight data
const weightData = [
    { date: 'Dec 1', weight: 180 },
    { date: 'Dec 5', weight: 179 },
    { date: 'Dec 10', weight: 178.5 },
    { date: 'Dec 15', weight: 178 },
];

export default function ReportsPage() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>

                {/* Weight Chart - Free */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-800">Weight</h2>
                        <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                            <option>Last 30 Days</option>
                            <option>Last 90 Days</option>
                            <option>Last 6 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="p-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={weightData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                                <YAxis stroke="#6B7280" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                                    labelStyle={{ fontWeight: 'bold' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="weight"
                                    stroke="#0073CF"
                                    strokeWidth={2}
                                    dot={{ fill: '#0073CF', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Net Calories - Premium */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                        <div className="text-center">
                            <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">Premium</span>
                            <p className="mt-2 text-gray-600">Unlock Net Calories tracking</p>
                            <Link href="/premium" className="mt-2 inline-block text-[#0073CF] hover:underline text-sm">
                                Upgrade Now →
                            </Link>
                        </div>
                    </div>
                    <div className="px-4 py-3 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-800">Net Calories</h2>
                    </div>
                    <div className="p-4 h-48 bg-gray-50"></div>
                </div>

                {/* Nutrients - Premium */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                        <div className="text-center">
                            <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">Premium</span>
                            <p className="mt-2 text-gray-600">Unlock detailed nutrient reports</p>
                            <Link href="/premium" className="mt-2 inline-block text-[#0073CF] hover:underline text-sm">
                                Upgrade Now →
                            </Link>
                        </div>
                    </div>
                    <div className="px-4 py-3 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-800">Nutrients</h2>
                    </div>
                    <div className="p-4 h-48 bg-gray-50"></div>
                </div>

                {/* Measurements - Premium */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                        <div className="text-center">
                            <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">Premium</span>
                            <p className="mt-2 text-gray-600">Track body measurements</p>
                            <Link href="/premium" className="mt-2 inline-block text-[#0073CF] hover:underline text-sm">
                                Upgrade Now →
                            </Link>
                        </div>
                    </div>
                    <div className="px-4 py-3 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-800">Measurements</h2>
                    </div>
                    <div className="p-4 h-48 bg-gray-50"></div>
                </div>

                {/* Steps - Premium */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                        <div className="text-center">
                            <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">Premium</span>
                            <p className="mt-2 text-gray-600">Track your daily steps</p>
                            <Link href="/premium" className="mt-2 inline-block text-[#0073CF] hover:underline text-sm">
                                Upgrade Now →
                            </Link>
                        </div>
                    </div>
                    <div className="px-4 py-3 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-800">Steps</h2>
                    </div>
                    <div className="p-4 h-48 bg-gray-50"></div>
                </div>
            </div>
        </div>
    );
}
