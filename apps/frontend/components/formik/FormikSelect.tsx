import { memo } from 'react';
import { useField } from 'formik';
import { Select, SelectProps } from '@mantine/core';

export type SelectOption = {
  value: string;
  label: string;
};

type Props = Omit<SelectProps, 'data'> & {
  name: string;
  options: SelectOption[];
};

export const FormikSelect = memo(function FormikSelect(props: Props) {
  const { options, value, setValue, errorMessage, selectProps, handleBlur } =
    useFormikSelect(props);

  return (
    <Select
      data={options}
      value={value}
      error={errorMessage}
      onChange={setValue}
      onBlur={handleBlur}
      {...selectProps}
    />
  );
});

function useFormikSelect(props: Props) {
  const { name, options, ...selectProps } = props;
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);
  const errorMessage = touched && error;

  const handleBlur = () => setTouched(true);

  return {
    name,
    options,
    value,
    setValue,
    errorMessage,
    selectProps,
    handleBlur,
  };
}
