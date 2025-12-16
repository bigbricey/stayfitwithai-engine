import Link from 'next/link';
import locations from '@/data/locations.json';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-slate-200 p-8 md:p-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Stay Fit With AI <span className="text-blue-500">access</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Find the most affordable, safe, and legal ways to access GLP-1 weight loss supplements in your city.
            Compare prices between Brand Name and Natural Alternatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/availability/${loc.state.toLowerCase()}/${loc.slug.split('-').slice(0, -1).join('-')}`}
              className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-white group-hover:text-blue-400 transition-colors">{loc.city}, {loc.state}</span>
                <span className="text-slate-600 text-sm">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
