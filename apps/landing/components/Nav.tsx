import { Box, Button, Center, Group } from '@mantine/core';
import LogoWhite from 'assets/qwiz-white.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Confetti } from 'phosphor-react';

const Nav = (props) => {
  const router = useRouter();
  return (
    <Group position="apart" sx={{ width: '100%' }}>
      <Box {...props}>
        <Center>
          <Image
            src={LogoWhite}
            alt="logo"
            objectFit="contain"
            className="auth-logo"
            width={52}
            height={52}
          />
        </Center>
      </Box>
      <Button
        variant="light"
        onClick={() => router.push('https://app.qwiz.party')}
        rightIcon={<Confetti size={20} weight="duotone" />}
      >
        To the app
      </Button>
    </Group>
  );
};

export default Nav;
