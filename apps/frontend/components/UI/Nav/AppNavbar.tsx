import {
  Avatar,
  Divider,
  Group,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useColorSchemeCtx } from 'hooks/colorscheme';
import {
  AppleLogo,
  Balloon,
  Cookie,
  Crown,
  Moon,
  Sun,
  Target,
  User,
} from 'phosphor-react';
import React from 'react';

import { NavbarItem } from './NavbarItem';

export const AppNavbar = (props) => {
  const { toggleColorScheme, isDark, isLight } = useColorSchemeCtx();
  const theme = useMantineTheme();

  return (
    <Navbar padding="md" width={{ base: 240 }}>
      <Navbar.Section className="bg">
        <Group
          sx={() => ({
            paddingBottom: '.75rem',
            paddingLeft: '.45rem',
            gap: '.75rem',
          })}
          position="apart"
        >
          <Group>
            <ThemeIcon radius="xl" size="md" color="gray">
              <Crown />
            </ThemeIcon>
            <Text transform="uppercase" weight="bolder">
              QWIZ
            </Text>
          </Group>
          <ThemeIcon radius="sm" size="md" onClick={() => toggleColorScheme()}>
            {isDark && <Sun color={theme.colors.yellow[4]} weight="duotone" />}
            {isLight && <Moon color={theme.colors.blue[8]} weight="duotone" />}
          </ThemeIcon>
        </Group>
      </Navbar.Section>
      <Divider
        sx={(_theme) => ({
          borderTopColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[2],
        })}
      />
      <Navbar.Section grow>
        <Group
          direction="column"
          spacing={0}
          sx={() => ({
            padding: '1rem 0',
          })}
        >
          <NavbarItem
            label="Events"
            href="/"
            color="pink"
            icon={<Cookie weight="duotone" />}
          />
          <NavbarItem
            label="Quiz"
            href="/"
            color="green"
            icon={<AppleLogo weight="duotone" />}
          />
          <NavbarItem
            label="Teams"
            href="/"
            color="blue"
            icon={<Balloon weight="duotone" />}
          />
          <NavbarItem
            label="Profile"
            href="/"
            color="blue"
            icon={<User weight="duotone" />}
          />
          <NavbarItem
            label="Score"
            href="/"
            color="blue"
            icon={<Target weight="duotone" />}
          />
        </Group>
      </Navbar.Section>
      <Navbar.Section style={{ display: 'flex', alignItems: 'center' }}>
        <UnstyledButton>
          <Group>
            <Avatar size={34} color="teal">
              MO
            </Avatar>
            <div>
              <Text size="sm">Matija Handsome</Text>
              <Text size="xs" color="gray">
                matija@handsome.inc
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
};
