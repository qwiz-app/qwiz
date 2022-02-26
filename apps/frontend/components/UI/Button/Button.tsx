import {
  Button as MantineButton,
  ButtonProps,
  SharedButtonProps,
} from '@mantine/core';
import React from 'react';

interface Props extends ButtonProps<'button'> {
  children: React.ReactNode;
}

export const Button = (props: Props) => {
  const { children } = props;

  const defaults: SharedButtonProps = {
    radius: 'sm',
  };

  return (
    <MantineButton {...defaults} {...props}>
      {children}
    </MantineButton>
  );
};
