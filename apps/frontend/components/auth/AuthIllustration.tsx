import { useAppColorscheme } from 'hooks/colorscheme';
import React from 'react';
import PeepDark from 'assets/peep2-dark.svg';
import Peep from 'assets/peep2.svg';
import Image from 'next/image';

export const AuthIllustration = (props) => {
  const { isDark } = useAppColorscheme();
  const illustration = isDark ? PeepDark : Peep;

  return (
    <div style={{ flex: '0 0 60vh' }}>
      <Image
        src={illustration}
        alt="city"
        objectFit="contain"
        className="signin-hero"
      />
    </div>
  );
};
