import Link from 'next/link';

export default function PremiumPage() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0073CF] to-[#005AA7] py-16 px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">StayFitWithAI Premium</h1>
                    <p className="text-xl text-blue-100 mb-8">Unlock the full power of your health journey</p>
                    <div className="bg-yellow-400 text-gray-800 inline-block px-6 py-3 rounded-lg text-lg font-bold">
                        Start Your Free Trial
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">Premium Features</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl text-white">📊</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Detailed Nutrient Reports</h3>
                        <p className="text-gray-600">Track over 150 nutrients including vitamins and minerals.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl text-white">🎯</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Custom Goals</h3>
                        <p className="text-gray-600">Set personalized calorie and macro targets for each day.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl text-white">🚫</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">No Ads</h3>
                        <p className="text-gray-600">Enjoy an ad-free experience across all devices.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl text-white">📉</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Net Calories Analysis</h3>
                        <p className="text-gray-600">See exactly how your eating and exercise balance out.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl text-white">📏</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Body Measurements</h3>
                        <p className="text-gray-600">Track your waist, hips, arms, and more over time.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl text-white">🍎</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Meal Planning</h3>
                        <p className="text-gray-600">Plan your meals ahead and hit your goals every day.</p>
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div className="bg-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Choose Your Plan</h2>

                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <div className="border-2 border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Monthly</h3>
                            <div className="text-4xl font-bold text-[#0073CF] mb-4">$9.99<span className="text-lg text-gray-500">/mo</span></div>
                            <button className="w-full bg-[#0073CF] text-white py-2 rounded font-medium hover:bg-[#005AA7] transition-colors">
                                Start Free Trial
                            </button>
                        </div>

                        <div className="border-2 border-[#0073CF] rounded-lg p-6 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                                BEST VALUE
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Annual</h3>
                            <div className="text-4xl font-bold text-[#0073CF] mb-4">$49.99<span className="text-lg text-gray-500">/yr</span></div>
                            <p className="text-green-600 text-sm mb-4">Save 58%</p>
                            <button className="w-full bg-[#0073CF] text-white py-2 rounded font-medium hover:bg-[#005AA7] transition-colors">
                                Start Free Trial
                            </button>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm mt-6">Cancel anytime. 7-day free trial.</p>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0073CF] py-12 px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-blue-100 mb-6">Join millions who have reached their health goals with Premium.</p>
                    <Link href="/signup" className="inline-block bg-white text-[#0073CF] px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
                        Start Your Free Trial
                    </Link>
                </div>
            </div>
        </div>
    );
}
