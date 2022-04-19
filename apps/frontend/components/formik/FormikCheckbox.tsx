import { memo } from 'react';
import { Box, Checkbox, Text, CheckboxProps } from '@mantine/core';
import { useField } from 'formik';

type Props = CheckboxProps & {
  name: string;
};

export const FormikCheckbox = memo(function FormikCheckbox(props: Props) {
  const { value, errorMessage, checkboxProps, handleChange, handleBlur } =
    useFormikCheckbox(props);

  return (
    <Box>
      <Checkbox
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...checkboxProps}
      />
      {errorMessage && (
        <Text sx={(t) => ({ color: t.colors.red })}>{errorMessage}</Text>
      )}
    </Box>
  );
});

function useFormikCheckbox(props: Props) {
  const { name, ...checkboxProps } = props;
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);
  const errorMessage = touched && error;

  const handleChange = (e) => setValue(e.target.checked);

  const handleBlur = () => setTouched(true);

  return { value, errorMessage, checkboxProps, handleChange, handleBlur };
}
