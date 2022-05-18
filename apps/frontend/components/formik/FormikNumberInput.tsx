import { NumberInput, NumberInputProps } from '@mantine/core';
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

  return (
    <NumberInput
      {...rest}
      {...numberInputProps}
      value={value ?? null}
      error={errorMessage}
    />
  );
});

const useFormikNumberInput = (props: Props) => {
  const { name, ...numberInputProps } = props;
  const [field, { touched, error }] = useField(name);
  const errorMessage = touched && error;

  return { field, errorMessage, numberInputProps };
};
