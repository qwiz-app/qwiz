import { ScrollArea, ScrollAreaProps } from '@mantine/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
} & ScrollAreaProps &
  React.RefAttributes<HTMLDivElement>;

export const ThinScrollArea = (props: Props) => {
  const { children } = props;
  return (
    <ScrollArea type="hover" scrollbarSize={8} scrollHideDelay={500} {...props}>
      {children}
    </ScrollArea>
  );
};
