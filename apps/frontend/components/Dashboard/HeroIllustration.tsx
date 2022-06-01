import { Center, Paper } from '@mantine/core';
import PeepUser from 'assets/peeps/hero/peep-hero-user.svg';
import Peep from 'assets/peeps/hero/peep-hero.svg';
import Image from 'next/image';

type Props = Record<string, unknown> & {
  isOrganization: boolean;
};
export const HeroIllustration = ({ isOrganization, ...rest }: Props) => {
  const illustration = isOrganization ? Peep : PeepUser;

  return (
    <Paper radius="md" {...rest}>
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
