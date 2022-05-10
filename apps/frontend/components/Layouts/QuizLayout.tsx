import { AppShell, Navbar, Header } from '@mantine/core';
import { Slides } from 'components/Quiz/Slides';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const QuizLayout = ({ children }: Props) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 200 }} >
          <Slides />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          width: '100%',
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default QuizLayout;
