import { FC, memo } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { useField } from 'formik';

type Props = TextInputProps & {
  name: string;
};

export const FormikTextInput: FC<Props> = memo(function FormikTextInput(props) {
  const {
    field: { value, ...rest },
    errorMessage,
    textInputProps,
  } = useFormikTextInput(props);

  return (
    <TextInput
      {...rest}
      {...textInputProps}
      value={value ?? ''}
      error={errorMessage}
    />
  );
});

const useFormikTextInput = (props: Props) => {
  const { name, ...textInputProps } = props;
  const [field, { touched, error }] = useField(name);
  const errorMessage = touched && error;

  return { field, errorMessage, textInputProps };
};
