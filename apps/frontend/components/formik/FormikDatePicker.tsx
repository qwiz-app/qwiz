import { memo } from 'react';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { useField } from 'formik';
import { useInputAccentStyles } from 'components/UI/use-input-styles';

type Props = DatePickerProps & {
  name: string;
};

export const FormikDatePicker = memo(function FormikDatePicker(props: Props) {
  const { field, errorMessage, datePickerProps, handleChange } =
    useFormikDatePicker(props);

  const { classes } = useInputAccentStyles();

  return (
    <DatePicker
      classNames={classes}
      {...field}
      {...datePickerProps}
      error={errorMessage}
      onChange={handleChange}
    />
  );
});

function useFormikDatePicker(props: Props) {
  const { name, ...datePickerProps } = props;
  const [field, { touched, error }, { setValue }] = useField(name);
  const errorMessage = touched && error;

  const handleChange = (date: Date | null) => setValue(date);

  return { field, errorMessage, datePickerProps, handleChange };
}
