'use client';

import { UserDataProvider } from '@/context/UserDataContext';
import { ThemeProvider } from '@/context/ThemeContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <UserDataProvider>
                {children}
            </UserDataProvider>
        </ThemeProvider>
    );
}
