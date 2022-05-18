import { Box, createStyles, Group, Paper, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  slot?: ReactNode;
  title: string;
}

export const SidePanelWrapper = ({ children, slot, title }: Props) => {
  const { classes } = useStyles();

  return (
    <Paper
      className={classes.wrapper}
      shadow="xs"
      radius="md"
      p="md"
      sx={() => ({
        // added for scroll area temp fix
        height: 'calc(100vh - 95px)',
      })}
    >
      <Group position="apart" spacing={4}>
        <Title order={5}>{title}</Title>
        {slot}
      </Group>
      <Box
        sx={() => ({
          height: '100%',
        })}
        // added for scroll area temp fix
        pb={50}
      >
        <Box mt={12}>{children}</Box>
      </Box>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100%',
  },
}));
