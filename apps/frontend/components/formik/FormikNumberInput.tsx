import { NumberInput, NumberInputProps } from '@mantine/core';
import { useInputAccentStyles } from 'components/UI/use-input-styles';
import { useField } from 'formik';
import { FC, memo } from 'react';

type Props = NumberInputProps & {
  name: string;
};

export const FormikNumberInput: FC<Props> = memo(function FormikNumberInput(
  props
) {
  const {
    field: { value, ...rest },
    errorMessage,
    numberInputProps,
  } = useFormikNumberInput(props);

  const { classes } = useInputAccentStyles();

  return (
    <NumberInput
      classNames={classes}
      {...rest}
      {...numberInputProps}
      value={value ?? ''}
      error={errorMessage}
      onChange={(n) => console.log(n)}
    />
  );
});

const useFormikNumberInput = (props: Props) => {
  const { name, ...numberInputProps } = props;
  const [field, { touched, error }] = useField(name);
  const errorMessage = touched && error;

  return { field, errorMessage, numberInputProps };
};
