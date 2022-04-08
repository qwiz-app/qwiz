import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const whitelistedUrls = [];

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const cookie = req.headers.get('cookie');

  console.log('cookie front :>> ', cookie);
  const sessionToken = getFromCookie(
    cookie,
    isVercelEnv()
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token'
  );

  if (!isApiUrl(req.url) && isWhitelistedUrl(req.nextUrl.pathname))
    return NextResponse.next();

  if (sessionToken && isSignInUrl(req.url)) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  if (!sessionToken && !isApiUrl(req.url) && !isSignInUrl(req.url)) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
  }

  return NextResponse.next();
};

const isWhitelistedUrl = (url: string) => whitelistedUrls.includes(url);

const isVercelEnv = () => process.env.VERCEL === '1';

const isApiUrl = (url: string) => {
  const splitUrl = url.split('/');

  return splitUrl.includes('api');
};

const isSignInUrl = (url: string) => url.includes('signin');

export const cookieToObject = (cookie: string) =>
  cookie
    ?.split('; ')
    .filter(Boolean)
    .map((s) => s.split('='))
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) ?? {};

export const getFromCookie = (cookie: string, field: string): string | null => {
  const obj = cookieToObject(cookie);
  return obj[field] ?? null;
};
