import { whitelistedUrls, organizationUrls } from 'pages/_middleware';
import config from './config';

export const isWhitelistedUrl = (url: string) => whitelistedUrls.includes(url);

export const isVercelEnv = () => config.vercel === '1';

export const isApiUrl = (url: string) => {
  const splitUrl = url.split('/');

  return splitUrl.includes('api');
};

export const isSignInUrl = (url: string) => url.includes('signin');

export const isOrganizationUrl = (url: string) =>
  organizationUrls.includes(url);

// TODO: allow only organizations: how to check for user role
// const isQuizzesUrl = (url: string) => url.includes('quiz');

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
