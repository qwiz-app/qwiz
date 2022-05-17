import { createStyles, Paper } from '@mantine/core';

export const SidePanelWrapper = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.wrapper} shadow="xs" radius="md" p="md">
      {children}
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100%',
  },
}));
