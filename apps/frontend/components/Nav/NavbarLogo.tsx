import LogoDark from 'assets/logo/qwiz-dark.svg';
import LogoWhite from 'assets/logo/qwiz-white.svg';
import { useAppColorscheme } from 'hooks/colorscheme';
import Image from 'next/image';
import Link from 'next/link';

export const NavbarLogo = () => {
  const { isDark } = useAppColorscheme();
  const logo = isDark ? LogoWhite : LogoDark;

  return (
    <Link href="/" passHref>
      <Image src={logo} alt="logo" objectFit="contain" width={64} height={64} />
    </Link>
  );
};
