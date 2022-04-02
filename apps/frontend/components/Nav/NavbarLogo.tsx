import LogoDark from 'assets/logo/qwiz-dark.svg';
import LogoWhite from 'assets/logo/qwiz-white.svg';
import { useAppColorscheme } from 'hooks/colorscheme';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';

const LogoImage = forwardRef(function LogoImage() {
  const { isDark } = useAppColorscheme();
  const logo = isDark ? LogoWhite : LogoDark;

  return (
    <Image src={logo} alt="logo" objectFit="contain" width={64} height={64} />
  );
});

export const NavbarLogo = () => {
  return (
    <Link href="/" passHref>
      <LogoImage />
    </Link>
  );
};
