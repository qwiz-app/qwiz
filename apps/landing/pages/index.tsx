import { Box, Container, Stack } from '@mantine/core';
import { AppTimeline } from 'components/AppTimeline/AppTimeline';
import Nav from 'components/Nav';
import styles from 'styles/index.module.scss';

import { Countdown } from '../components/Countdown';

const targetDate = new Date(2022, 5, 10);

export const Index = () => {
  return (
    <Box className={styles.landing}>
      <Container size="md" pt={32} pb={128}>
        <Stack align="center" spacing={128}>
          <Nav />
          <Stack align="center" mb={64}>
            <h1 className={styles.landing__title}>Get ready</h1>
            <Countdown targetDate={targetDate} />
          </Stack>
          <AppTimeline />
        </Stack>
      </Container>
    </Box>
  );
};

export default Index;
