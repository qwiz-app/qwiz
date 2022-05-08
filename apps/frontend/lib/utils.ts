import sha1 from 'sha1';

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
