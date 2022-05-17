import {
  Aside,
  createStyles,
  Group,
  Navbar,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { Fingerprint, Gauge, User } from 'phosphor-react';
import { useState } from 'react';

interface NavbarLinkProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({
  icon: Icon,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon weight="duotone" size={24} />
      </UnstyledButton>
    </Tooltip>
  );
};

const mockdata = [
  { icon: Gauge, label: 'Dashboard' },
  { icon: User, label: 'Account' },
  { icon: Fingerprint, label: 'Security' },
];

export const NavbarMinimal = () => {
  const [active, setActive] = useState(1);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Aside
      width={{ base: 60 }}
      p={0}
      fixed
      sx={(theme) => ({})}
      position={{
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Navbar.Section grow mt={40}>
        <Group direction="column" align="center" spacing="sm">
          {links}
        </Group>
      </Navbar.Section>
    </Aside>
  );
};

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}));
