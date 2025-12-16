import Link from 'next/link';

const measurements = [
    { name: 'Waist', lastValue: '32', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Waist (Flexed)', lastValue: '31', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Right Arm', lastValue: '13', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Right Arm (Flexed)', lastValue: '14', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Left Arm', lastValue: '13', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Left Arm (Flexed)', lastValue: '14', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Right Forearm', lastValue: '11', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Right Forearm (Flexed)', lastValue: '11.5', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Left Forearm', lastValue: '11', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Left Forearm (Flexed)', lastValue: '11.5', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Right Thigh', lastValue: '22', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Right Thigh (Flexed)', lastValue: '23', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Left Thigh', lastValue: '22', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Left Thigh (Flexed)', lastValue: '23', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Right Calf', lastValue: '15', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Right Calf (Flexed)', lastValue: '15.5', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Left Calf', lastValue: '15', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Left Calf (Flexed)', lastValue: '15.5', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Chest', lastValue: '40', lastDate: 'Dec 10, 2024', unit: 'in' },
    { name: 'Chest (Flexed)', lastValue: '42', lastDate: 'Dec 10, 2024', unit: 'in' },
];

export default function CheckInPage() {
    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Check-In</h1>

                {/* Weight Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-5">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Enter today&apos;s weight:</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder=""
                                    className="w-24 border border-gray-300 rounded px-3 py-2 text-lg focus:border-[#0073CF] focus:outline-none"
                                />
                                <span className="text-gray-600">lbs</span>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Last recorded weight: <span className="font-medium text-gray-700">172 lbs</span> on Dec 14, 2024
                        </div>
                    </div>
                </div>

                {/* Other Measurements */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Other Measurements</h2>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-3 px-5 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="text-sm font-medium text-gray-600">Measurement</div>
                        <div className="text-sm font-medium text-gray-600">Last Entry</div>
                        <div className="text-sm font-medium text-gray-600">Today&apos;s Entry</div>
                    </div>

                    {/* Measurement Rows */}
                    <div className="divide-y divide-gray-100">
                        {measurements.map((m, idx) => (
                            <div key={idx} className="grid grid-cols-3 px-5 py-3 items-center hover:bg-gray-50">
                                <div className="text-gray-700">{m.name}</div>
                                <div>
                                    <span className="text-gray-800">{m.lastValue} {m.unit}</span>
                                    <span className="text-xs text-gray-400 ml-2">{m.lastDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder=""
                                        className="w-20 border border-gray-300 rounded px-2 py-1 text-sm focus:border-[#0073CF] focus:outline-none"
                                    />
                                    <span className="text-sm text-gray-500">{m.unit}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 mb-6 text-sm">
                    <Link href="/check-in/additional" className="text-[#0073CF] hover:underline">
                        Track Additional Measurements
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/check-in/history" className="text-[#0073CF] hover:underline">
                        Edit Previous Entries
                    </Link>
                </div>

                {/* Save Button */}
                <div>
                    <button className="bg-[#0073CF] text-white px-6 py-2 rounded font-medium hover:bg-[#005AA7] transition-colors">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
