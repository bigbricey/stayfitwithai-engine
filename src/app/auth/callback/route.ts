import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);

    // For implicit flow, tokens come in the URL hash (client-side)
    // This callback is mainly for PKCE flow code exchange
    // With implicit flow, we may still get called but with no code

    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    // If we have tokens directly (implicit flow redirect), set session
    if (accessToken) {
        const cookieStore = await cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
                        } catch {
                            // Ignore errors from Server Components
                        }
                    },
                },
            }
        );

        const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
        });

        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }

        return NextResponse.redirect(`${origin}/login?error=session_failed`);
    }

    // PKCE flow: exchange code for session
    if (code) {
        const cookieStore = await cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
                        } catch {
                            // Ignore errors from Server Components
                        }
                    },
                },
            }
        );

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }

        return NextResponse.redirect(`${origin}/login?error=exchange_failed&detail=${encodeURIComponent(error.message)}`);
    }

    // No code and no tokens - check for errors
    const errorParam = searchParams.get('error');

    if (errorParam) {
        const errorDesc = searchParams.get('error_description') || '';
        return NextResponse.redirect(`${origin}/login?error=${errorParam}&detail=${encodeURIComponent(errorDesc)}`);
    }

    // Just redirect to dashboard - implicit flow handles tokens client-side
    return NextResponse.redirect(`${origin}/dashboard`);
}
