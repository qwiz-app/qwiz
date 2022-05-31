import {
  Box,
  createStyles,
  Group,
  Paper, Title
} from '@mantine/core';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
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
      component={ThinScrollArea}
      radius="md"
      p="md"
      withBorder
      sx={() => ({
        height: 'calc(100vh - 100px)',
        maxWidth: 400,
        marginLeft: 'auto',
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
        mt={12}
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
