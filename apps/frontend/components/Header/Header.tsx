import {
  Burger,
  Header as MantineHeader,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';

type Props = {
  onNavbarToggle: () => void;
  opened: boolean;
};

const Header = ({ onNavbarToggle, opened }: Props) => {
  const { matches } = useBreakpoints();
  const theme = useMantineTheme();

  return (
    <MantineHeader height={60} padding="md" fixed hidden={matches.max.xs}>
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
