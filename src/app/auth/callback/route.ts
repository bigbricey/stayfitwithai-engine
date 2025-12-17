import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.error('=== AUTH CALLBACK ROUTE HIT ===');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Full URL:', request.url);

    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('redirect') ?? '/dashboard';

    console.error('Params:', { code: code?.substring(0, 20) + '...', next, origin });

    if (code) {
        console.error('Code present, starting cookie operations');

        const cookieStore = await cookies();

        // Log all current cookies for debugging
        const allCookies = cookieStore.getAll();
        console.error('Current cookies:', allCookies.map(c => ({ name: c.name, len: c.value.length })));

        // Check for PKCE code_verifier
        const codeVerifier = allCookies.find(c => c.name.includes('code_verifier'));
        console.error('Code verifier cookie:', codeVerifier ? 'PRESENT' : 'MISSING');

        // Create response to set cookies on
        const response = NextResponse.redirect(`${origin}${next}`);

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        const value = cookieStore.get(name)?.value;
                        console.error(`Cookie GET: ${name} = ${value ? value.substring(0, 30) + '...' : 'undefined'}`);
                        return value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        console.error(`Cookie SET: ${name} (${value.length} chars)`);
                        response.cookies.set({
                            name,
                            value,
                            ...options,
                        });
                    },
                    remove(name: string, options: CookieOptions) {
                        console.error(`Cookie REMOVE: ${name}`);
                        response.cookies.set({
                            name,
                            value: '',
                            ...options,
                        });
                    },
                },
            }
        );

        console.error('Supabase client created, exchanging code for session...');

        try {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);

            console.error('Exchange result:', {
                hasData: !!data,
                hasSession: !!data?.session,
                hasUser: !!data?.session?.user,
                userEmail: data?.session?.user?.email,
                error: error?.message,
                errorStatus: error?.status,
            });

            if (error) {
                console.error('Session exchange FAILED:', error.message);
                return NextResponse.redirect(`${origin}/login?error=exchange_failed`);
            }

            if (data?.session) {
                console.error('Session established! Redirecting to:', next);
                return response;
            }
        } catch (err) {
            console.error('EXCEPTION during exchange:', err);
            return NextResponse.redirect(`${origin}/login?error=exception`);
        }
    }

    console.error('No code provided or session failed, redirecting to login');
    return NextResponse.redirect(`${origin}/login?error=auth_error`);
}
