import { generateBoringAvatar } from 'lib/utils';
import { useEffect, useState } from 'react';

export const useAvatarGen = (staticSeed: string, dynamicSeed = '') => {
  const [generatedAvatar, setGeneratedAvatar] = useState(null);

  const [randN, setRandN] = useState(Math.random().toString());

  const generateAvatarHandler = () => setRandN(Math.random().toString());

  const uniqueSeed = `${dynamicSeed}.${randN}`;

  useEffect(() => {
    if (uniqueSeed) {
      const newAvatar = generateBoringAvatar(`${staticSeed}.${uniqueSeed}`);
      setGeneratedAvatar(newAvatar);
    }
  }, [staticSeed, uniqueSeed]);

  return {
    generatedAvatar,
    generateAvatar: generateAvatarHandler,
  };
};
