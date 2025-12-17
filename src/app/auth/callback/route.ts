import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// VERSION: 2025-12-17-v3 - Fix cookie handling in response
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('redirect') ?? '/dashboard';
    const errorParam = searchParams.get('error');

    console.error('[CALLBACK v3] Request received:', { hasCode: !!code, next, errorParam });

    // If no code, redirect to login with debug info
    if (!code) {
        const reason = errorParam ? `oauth_error_${errorParam}` : 'no_code';
        return NextResponse.redirect(`${origin}/login?error=${reason}&v=3`);
    }

    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.getAll();
        const cookieNames = allCookies.map(c => c.name).join(',');

        console.error('[CALLBACK v3] Cookies found:', cookieNames);

        // Check for PKCE code verifier
        const hasCodeVerifier = allCookies.some(c => c.name.includes('code_verifier'));

        if (!hasCodeVerifier) {
            const debugInfo = encodeURIComponent(`no_verifier|count:${allCookies.length}|names:${cookieNames.substring(0, 80)}`);
            return NextResponse.redirect(`${origin}/login?error=missing_verifier&debug=${debugInfo}&v=3`);
        }

        // Collect cookies to set on response later
        const cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }> = [];

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        console.error('[CALLBACK v3] Cookie SET called:', name, value.length, 'bytes');
                        cookiesToSet.push({ name, value, options });
                    },
                    remove(name: string, options: CookieOptions) {
                        console.error('[CALLBACK v3] Cookie REMOVE called:', name);
                        cookiesToSet.push({ name, value: '', options: { ...options, maxAge: 0 } });
                    },
                },
            }
        );

        console.error('[CALLBACK v3] Calling exchangeCodeForSession...');
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        console.error('[CALLBACK v3] Exchange result:', {
            hasData: !!data,
            hasSession: !!data?.session,
            hasUser: !!data?.session?.user,
            userEmail: data?.session?.user?.email,
            errorMessage: error?.message,
            errorStatus: error?.status,
            cookiesToSetCount: cookiesToSet.length
        });

        if (error) {
            const errorInfo = encodeURIComponent(`${error.message}|${error.status || 'no_status'}`);
            return NextResponse.redirect(`${origin}/login?error=exchange_failed&detail=${errorInfo}&v=3`);
        }

        if (!data?.session) {
            return NextResponse.redirect(`${origin}/login?error=no_session&v=3`);
        }

        // SUCCESS! Now create response and set all cookies
        console.error('[CALLBACK v3] Success! Redirecting to:', next, 'with', cookiesToSet.length, 'cookies');

        const response = NextResponse.redirect(`${origin}${next}`);

        for (const { name, value, options } of cookiesToSet) {
            response.cookies.set({
                name,
                value,
                ...options,
            });
        }

        return response;

    } catch (err) {
        console.error('[CALLBACK v3] Exception:', err);
        const errorMsg = err instanceof Error ? err.message : 'unknown';
        const errorInfo = encodeURIComponent(errorMsg.substring(0, 100));
        return NextResponse.redirect(`${origin}/login?error=exception&detail=${errorInfo}&v=3`);
    }
}
