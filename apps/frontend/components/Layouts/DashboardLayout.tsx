import { Container } from '@mantine/core';
import { useBreakpoints } from 'hooks/breakpoints';
import { AppShell } from '../AppShell/AppShell';

const DashboardLayout = ({ children }) => {
  const { matches } = useBreakpoints();

  const sidePadding = () => {
    if (matches.max.sm) {
      return 0;
    }
    if (matches.max.md) {
      return 8;
    }
    if (matches.max.lg) {
      return 16;
    }
    return 24;
  };

  return (
    <AppShell>
      <Container
        fluid
        pt={16}
        py={32}
        pb={16}
        px={sidePadding()}
        sx={() => ({
          maxWidth: 3000,
          overflowX: 'hidden',
        })}
      >
        {children}
      </Container>
    </AppShell>
  );
};

export default DashboardLayout;
