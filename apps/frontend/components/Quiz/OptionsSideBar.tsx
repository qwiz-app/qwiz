import {
  ActionIcon,
  Aside,
  createStyles,
  Group,
  Navbar,
  Tooltip
} from '@mantine/core';
import { CircleWavyQuestion, Gear, ListPlus } from 'phosphor-react';

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
      <ActionIcon
        onClick={onClick}
        className={cx(classes.link)}
        variant={active ? 'light' : 'transparent'}
        color={active ? 'primary' : 'gray'}
      >
        <Icon weight="duotone" size={24} />
      </ActionIcon>
    </Tooltip>
  );
};

const mockdata: { icon: any; label: string }[] = [
  { icon: ListPlus, label: 'Questions' },
  { icon: CircleWavyQuestion, label: 'Selected question' },
  { icon: Gear, label: 'Settings' },
];

interface Props {
  active: number;
  onSelect: (index: number) => void;
}

export const OptionsSideBar = ({ active, onSelect }: Props) => {
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => onSelect(index)}
    />
  ));

  return (
    <Aside
      width={{ base: 60 }}
      p={0}
      fixed
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
          : theme.colors.gray[2],
    },
  },
}));
