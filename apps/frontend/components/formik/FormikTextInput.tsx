import { TextInput, TextInputProps } from '@mantine/core';
import { useInputAccentStyles } from 'components/UI/use-input-styles';
import { useField } from 'formik';
import { FC, memo } from 'react';

type Props = TextInputProps & {
  name: string;
};

export const FormikTextInput: FC<Props> = memo(function FormikTextInput(props) {
  const {
    field: { value, ...rest },
    errorMessage,
    textInputProps,
  } = useFormikTextInput(props);

  const { classes } = useInputAccentStyles();

  return (
    <TextInput
      classNames={classes}
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
