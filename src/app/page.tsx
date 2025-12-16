import ChatInterface from '@/components/chat/ChatInterface';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ThemeToggleWrapper } from '@/components/ThemeToggleWrapper';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <main className="bg-white dark:bg-black min-h-screen transition-colors">
      <header className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
        <h1 className="text-gray-900 dark:text-gray-100 font-bold tracking-tight">Stay Fit with AI</h1>
        <div className="flex items-center gap-3">
          <ThemeToggleWrapper />
          {/* User Avatar */}
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
            {user.email?.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>
      <ChatInterface />
    </main>
  );
}
