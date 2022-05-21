import { Tooltip } from '@mantine/core';
import { forwardRef, ReactNode } from 'react';

interface Props {
  opened: boolean;
  children: ReactNode;
}

// TODO: not working
export const TooltipCopiedLink = forwardRef<HTMLDivElement, Props>(
  ({ opened, children }: Props, ref) => (
    <Tooltip
      ref={ref}
      label="Link copied!"
      gutter={5}
      placement="center"
      position="bottom"
      transition="slide-down"
      transitionDuration={200}
      opened={opened}
      sx={() => ({ width: '100%' })}
    >
      {children}
    </Tooltip>
  )
);
