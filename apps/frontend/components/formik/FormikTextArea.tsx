import { FC, memo } from 'react';
import { Textarea, TextareaProps } from '@mantine/core';
import { useField } from 'formik';
import { useInputAccentStyles } from 'components/UI/use-input-styles';

type Props = TextareaProps & {
  name: string;
};

export const FormikTextareaInput: FC<Props> = memo(function FormikTextAreaInput(
  props
) {
  const { field, errorMessage, textareaProps } = useFormikTextAreaInput(props);

  const { classes } = useInputAccentStyles();
  return (
    <Textarea
      classNames={classes}
      {...field}
      {...textareaProps}
      error={errorMessage}
    />
  );
});

const useFormikTextAreaInput = (props: Props) => {
  const { name, ...textareaProps } = props;
  const [field, { touched, error }] = useField(name);
  const errorMessage = touched && error;

  return { field, errorMessage, textareaProps };
};
