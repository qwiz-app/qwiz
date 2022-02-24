import {
  Button as MantineButton,
  CSSObject,
  MantineTheme,
  ButtonProps,
  SharedButtonProps,
} from '@mantine/core';
import React from 'react';

interface Props extends ButtonProps<'button'> {
  children: React.ReactNode;
}

const Button = (props: Props) => {
  const { defaults, sx, children } = useButtonStyles(props);

  return (
    <MantineButton {...props} {...defaults} sx={sx}>
      {children}
    </MantineButton>
  );
};

const useButtonStyles = ({ children, color }: Props) => {
  const defaults: SharedButtonProps = {
    radius: 'xs',
  };

  const sx: CSSObject | ((theme: MantineTheme) => CSSObject) = {};

  return { sx, defaults, children, color };
};

Button.defaultProps = {
  radius: 'xs',
};

export default Button;
