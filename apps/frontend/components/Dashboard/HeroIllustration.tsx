import { Center, Paper } from '@mantine/core';
import Peep from 'assets/peeps/hero/peep-hero.svg';
import { useAppColorscheme } from 'hooks/colorscheme';
import Image from 'next/image';

export const HeroIllustration = (props) => {
  const { isDark } = useAppColorscheme();
  const illustration = isDark ? Peep : Peep;

  return (
    <Paper radius="md" {...props}>
      <Center>
        <Image
          src={illustration}
          alt="Peep"
          objectFit="contain"
          className="signin-hero"
          width={400}
          height={400}
        />
      </Center>
    </Paper>
  );
};
