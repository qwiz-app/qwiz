import sha1 from 'sha1';

export const generateBoringAvatar = (seed: string) => {
  const source = 'https://source.boringavatars.com/marble/120/';

  const hash = sha1(seed);

  return `${source}${hash}?square`;
};
