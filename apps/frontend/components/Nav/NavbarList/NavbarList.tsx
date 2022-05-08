import { Group, Stack } from '@mantine/core';
import { NavItemModel } from 'types/nav-item';
import { NavbarItem } from '../NavbarItem/NavbarItem';

type Props = {
  items: NavItemModel[];
};

export const NavbarList = ({ items }: Props) => {
  return (
    <Group direction="column" align="stretch" spacing={0} mb={12}>
      <Stack spacing={2}>
        {items.map((item, i) => (
          <NavbarItem key={`navbar-item-${i}`} {...item} />
        ))}
      </Stack>
    </Group>
  );
};
