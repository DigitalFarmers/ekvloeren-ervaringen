import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['nl', 'en', 'fr', 'es'],

    // Used when no locale matches
    defaultLocale: 'nl'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(nl|en|fr|es)/:path*']
};
