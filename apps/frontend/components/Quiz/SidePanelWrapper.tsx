import { Box, createStyles, Paper, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
}

export const SidePanelWrapper = ({ children, title }: Props) => {
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
      <Box>
        <Title order={5}>{title}</Title>
      </Box>
      <Box
        mt={16}
        sx={() => ({
          height: '100%',
        })}
        // added for scroll area temp fix
        pb={50}
      >
        {children}
      </Box>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100%',
  },
}));
