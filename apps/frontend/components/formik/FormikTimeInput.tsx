import { memo } from 'react';
import { TimeInput, TimeInputProps } from '@mantine/dates';
import { useField } from 'formik';
import { useInputAccentStyles } from 'components/UI/use-input-styles';

type Props = TimeInputProps & {
  name: string;
};

export const FormikTimeInput = memo(function FormikTimeInput(props: Props) {
  const { field, errorMessage, datePickerProps, handleChange } =
    useFormikTimeInput(props);

  const { classes } = useInputAccentStyles();

  return (
    <TimeInput
      classNames={classes}
      {...field}
      {...datePickerProps}
      error={errorMessage}
      onChange={handleChange}
    />
  );
});

function useFormikTimeInput(props: Props) {
  const { name, ...datePickerProps } = props;
  const [field, { touched, error }, { setValue }] = useField(name);
  const errorMessage = touched && error;

  const handleChange = (date: Date | null) => setValue(date);

  return { field, errorMessage, datePickerProps, handleChange };
}
