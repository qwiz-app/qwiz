import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import sha1 from 'sha1';

export const generateBoringAvatar = (seed: string) => {
  const source = 'https://source.boringavatars.com/marble/164/';

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

export enum DateTimeFormat {
  DATE_NO_YEAR = 'MMMM DD',
  DATE = 'MMMM DD, YYYY',
  TIME = 'HH:mm',
  DATE_TIME = 'MMMM DD, YYYY [at] HH:mm',
}

export const formatDate = (
  date: Date,
  format: DateTimeFormat | string = DateTimeFormat.DATE_TIME
) => {
  return dayjs(date).format(format);
};

// numbers
export const formatCurrency = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumSignificantDigits: 1,
    currency,
  }).format(amount);

export const isNumber = (value: any): boolean => typeof value === 'number';
