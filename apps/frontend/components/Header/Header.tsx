import {
  MediaQuery,
  Burger,
  Header as MantineHeader,
  useMantineTheme,
  Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

type Props = {
  onNavbarToggle: () => void;
  opened: boolean;
};

const Header = ({ onNavbarToggle, opened }: Props) => {
  const matches = useMediaQuery('(min-width: 576px)');
  const theme = useMantineTheme();

  return (
    <MantineHeader height={60} padding="md" fixed hidden={matches}>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={onNavbarToggle}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </MantineHeader>
  );
};

export default Header;
