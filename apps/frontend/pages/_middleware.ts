import {
  getFromCookie,
  isVercelEnv,
  isApiUrl,
  isWhitelistedUrl,
  isSignInUrl,
  isOrganizationUrl,
} from 'lib/routes';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const whitelistedUrls = ['/', '/verify-request'];

export const organizationUrls = ['/quiz'];

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const cookie = req.headers.get('cookie');
  const SIGN_IN = new URL('/signin', req.nextUrl.origin);

  const sessionToken = getFromCookie(
    cookie,
    isVercelEnv()
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token'
  );

  const role = getFromCookie(cookie, 'role');

  if (!isApiUrl(req.url) && isWhitelistedUrl(req.nextUrl.pathname))
    return NextResponse.next();

  if (sessionToken && isSignInUrl(req.url)) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  if (!sessionToken && !isApiUrl(req.url) && !isSignInUrl(req.url)) {
    return NextResponse.redirect(SIGN_IN);
  }

  if (
    !isApiUrl(req.url) &&
    isOrganizationUrl(req.nextUrl.pathname) &&
    (!role || role !== 'ORGANIZATION')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  return NextResponse.next();
};
