import { Box, Center } from '@mantine/core';
import LogoDark from 'assets/logo/qwiz-dark.svg';
import LogoWhite from 'assets/logo/qwiz-white.svg';
import { useAppColorscheme } from 'hooks/colorscheme';
import Image from 'next/image';

export const AuthLogo = (props) => {
  const { isDark } = useAppColorscheme();
  const logo = isDark ? LogoWhite : LogoDark;

  return (
    <Box {...props}>
      <Center>
        <Image
          src={logo}
          alt="logo"
          objectFit="contain"
          className="auth-logo"
          width={52}
          height={52}
        />
      </Center>
    </Box>
  );
};
