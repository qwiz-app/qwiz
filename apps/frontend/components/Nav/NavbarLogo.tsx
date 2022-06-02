import { UnstyledButton } from '@mantine/core';
import LogoDark from 'assets/logo/qwiz-dark.svg';
import LogoWhite from 'assets/logo/qwiz-white.svg';
import { useAppColorscheme } from 'hooks/colorscheme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { forwardRef } from 'react';

const LogoImage = forwardRef(function LogoImage() {
  const { isDark } = useAppColorscheme();
  const logo = isDark ? LogoWhite : LogoDark;

  return (
    <Image src={logo} alt="logo" objectFit="contain" width={64} height={64} />
  );
});

export const NavbarLogo = () => {
  const router = useRouter();
  return (
    <UnstyledButton onClick={() => router.push(paths.home())}>
      <LogoImage />
    </UnstyledButton>
  );
};
