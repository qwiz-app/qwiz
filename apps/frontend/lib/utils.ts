import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import sha1 from 'sha1';
import config from 'lib/config';
import { organizationUrls, whitelistedUrls } from 'pages/_middleware';

export const generateBoringAvatar = (seed: string) => {
  const source = 'https://source.boringavatars.com/marble/120/';

  const hash = sha1(seed);

  return `${source}${hash}?square`;
};

export const generateRandomNumber = ({
  from,
  to,
}: {
  from: number;
  to: number;
}) => Math.floor(Math.random() * (to - from + 1)) + from;

export const generateArrayForRange = (range: number, start = 1) =>
  [...Array(range)].map((_, i) => i + start);

// dayjs
export const relativeTimeTo = (date: Date) => {
  dayjs.extend(relativeTime);
  return dayjs().to(date);
};

export const relativeTimeUntil = (date: Date) => {
  dayjs.extend(relativeTime);
  return dayjs().from(date);
};

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
