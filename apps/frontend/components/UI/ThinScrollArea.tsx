import { ScrollArea } from '@mantine/core';
import React from 'react';

// TODO: ScrollAreaProps & React.RefAttributes<HTMLDivElement>
export const ThinScrollArea = (props): any => {
  const { children } = props;
  return (
    <ScrollArea type="hover" scrollbarSize={8} scrollHideDelay={500} {...props}>
      {children}
    </ScrollArea>
  );
};
