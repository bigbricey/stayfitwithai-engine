import Link from 'next/link';
import TimelineCalculator from '@/components/TimelineCalculator';

export default function Home() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section - Light Blue */}
      <div className="bg-gradient-to-b from-[#E8F4FC] to-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Free Online Calorie Counter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Track your food, exercise, and weight loss goals. Join millions who have
            achieved their fitness goals with our science-based tools.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="bg-[#0073CF] text-white px-8 py-3 rounded font-semibold hover:bg-[#005AA7] transition-colors shadow-lg"
            >
              Start for Free
            </Link>
            <Link
              href="/login"
              className="bg-white text-[#0073CF] px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Calorie Calculator Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Weight Loss Timeline Forecaster</h2>
          <p className="text-gray-500 text-center mb-8">Science-based predictions using the Mifflin-St Jeor equation</p>
          <TimelineCalculator />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Why Choose StayFitWithAI?</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Everything you need to reach your fitness goals, completely free.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Track Calories</h3>
            <p className="text-gray-600">Log your meals and track calories with our database of 380,000+ foods.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏃</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Log Exercise</h3>
            <p className="text-gray-600">Track your workouts and see how many calories you burn each day.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#0073CF] rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">See Progress</h3>
            <p className="text-gray-600">Watch your weight trend over time with beautiful charts and insights.</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#0073CF] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-1">380K+</div>
              <div className="text-blue-100 text-sm">Foods in Database</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-blue-100 text-sm">Free Forever</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">5+</div>
              <div className="text-blue-100 text-sm">Free Tools</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">Science</div>
              <div className="text-blue-100 text-sm">Based Methods</div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Tools */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Free Fitness Tools</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/tools/bmi-calculator" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#0073CF] transition-all group">
            <h3 className="font-bold text-gray-800 group-hover:text-[#0073CF] transition-colors">BMI Calculator</h3>
            <p className="text-gray-500 text-sm mt-1">Check your body mass index</p>
          </Link>

          <Link href="/tools/calorie-calculator" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#0073CF] transition-all group">
            <h3 className="font-bold text-gray-800 group-hover:text-[#0073CF] transition-colors">Calorie Calculator</h3>
            <p className="text-gray-500 text-sm mt-1">Find your daily calorie needs</p>
          </Link>

          <Link href="/goals" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#0073CF] transition-all group">
            <h3 className="font-bold text-gray-800 group-hover:text-[#0073CF] transition-colors">Weight Loss Goals</h3>
            <p className="text-gray-500 text-sm mt-1">100+ goal templates</p>
          </Link>

          <Link href="/dashboard" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#0073CF] transition-all group">
            <h3 className="font-bold text-gray-800 group-hover:text-[#0073CF] transition-colors">Food Diary</h3>
            <p className="text-gray-500 text-sm mt-1">Track your daily intake</p>
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0073CF] to-[#005AA7] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join for free and start tracking your nutrition today.</p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[#0073CF] px-10 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}
