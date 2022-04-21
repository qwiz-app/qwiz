import { Group, Stack } from '@mantine/core';
import { NavbarItem, NavbarItemModel } from '../NavbarItem/NavbarItem';

type Props = {
  items: NavbarItemModel[];
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
