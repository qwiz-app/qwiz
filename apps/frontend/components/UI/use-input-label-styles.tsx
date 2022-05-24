import { createStyles } from '@mantine/core';

export const useInputLabelStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
    fontWeight: 500,

    '&:focus, &:focus-within': {
      borderColor:
        theme.colorScheme === 'dark' && `${theme.colors.orange[4]} !important`,
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
    fontFamily: theme.fontFamilyMonospace,
    fontWeight: 600,
    opacity: 0.95,
  },
}));
