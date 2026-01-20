import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Check if the path starts with a locale
    const pathnameIsMissingLocale = ['/nl', '/en', '/fr', '/es'].some(
        (locale) => pathname.startsWith(locale)
    )

    // Redirect to root if a locale is present (Revert strategy)
    if (pathnameIsMissingLocale) {
        // Remove the locale part: /nl/foo -> /foo, /nl -> /
        const newPath = pathname.replace(/^\/(nl|en|fr|es)/, '') || '/'
        return NextResponse.redirect(new URL(newPath, request.url))
    }
}

export const config = {
    matcher: [
        // Match all pathnames except for internal ones
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
