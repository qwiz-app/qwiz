import { useAppColorscheme } from 'hooks/colorscheme';
import React from 'react';
import PeepDark from 'assets/peeps/peep-dark.svg';
import Peep from 'assets/peeps/peep.svg';
import Image from 'next/image';

export const AuthIllustration = (props) => {
  const { isDark } = useAppColorscheme();
  const illustration = isDark ? PeepDark : Peep;

  return (
    <div {...props}>
      <Image
        src={illustration}
        alt="city"
        objectFit="contain"
        className="signin-hero"
        width={620}
        height={620}
      />
    </div>
  );
};
