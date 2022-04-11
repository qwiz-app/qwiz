import { Box } from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import LogoWhite from 'assets/logo/qwiz-white.svg';
import LogoDark from 'assets/logo/qwiz-dark.svg';
import Image from 'next/image';

export const AuthLogo = (props) => {
  const { isDark } = useAppColorscheme();
  const logo = isDark ? LogoWhite : LogoDark;

  return (
    <Box {...props}>
      <Image
        src={logo}
        alt="logo"
        objectFit="contain"
        className="auth-logo"
        width={52}
        height={52}
      />
    </Box>
  );
};
