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
  organizationUrls.includes(url);

export const isWhitelistedUrl = (url: string) => whitelistedUrls.includes(url);

export const isVercelEnv = () => config.vercel === '1';

export const isApiUrl = (url: string) => {
  const splitUrl = url.split('/');

  return splitUrl.includes('api');
};

export const isSignInUrl = (url: string) => url.includes('signin');

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
