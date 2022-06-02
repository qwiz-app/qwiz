import { Group, Stack } from '@mantine/core';
import { NavItemModel } from 'types/elements/nav-item';
import { NavbarItem } from './NavbarItem';

interface Props {
  items: NavItemModel[];
  onSelect?: () => void;
};

export const NavbarList = ({ items, onSelect }: Props) => {
  return (
    <Group direction="column" align="stretch" spacing={0} mb={12}>
      <Stack spacing={2}>
        {items.map((item, i) => (
          <NavbarItem key={`navbar-item-${i}`} {...item} onSelect={onSelect} />
        ))}
      </Stack>
    </Group>
  );
};
