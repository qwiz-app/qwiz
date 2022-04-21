import { Group, Kbd } from '@mantine/core';
import React from 'react';

type Props = {
  keys: string[];
};

const KbdShortcut = ({ keys }: Props) => {
  const isLast = (index: number) => index === keys.length - 1;
  return (
    <Group align="center" spacing={0}>
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          <Kbd sx={(t) => ({ fontFamily: 'monospace' })}>{key}</Kbd>
          {!isLast(i) && <span>+</span>}
        </React.Fragment>
      ))}
    </Group>
  );
};

export default KbdShortcut;
