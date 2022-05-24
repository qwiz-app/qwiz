import config from './config';

// TODO: how to check for ids
export const whitelistedUrls = [
  '/',
  '/verify-request',
  '/events',
  '/organizations',
];

export const organizationUrls = ['/quiz'];

export const isOrganizationUrl = (url: string) =>
  organizationUrls.some((route) => url.startsWith(route));

export const isWhitelistedUrl = (url: string) =>
  whitelistedUrls.some((route) => url.startsWith(route));

export const isVercelEnv = () => config.vercel === '1';

export const isApiUrl = (url: string) => url.startsWith('/api');

export const isSignInUrl = (url: string) => url.startsWith('/signin');

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
