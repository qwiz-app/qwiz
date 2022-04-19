import { memo } from 'react';
import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { useField } from 'formik';

export type SelectOption = {
  value: string;
  label: string;
};

type Props = Omit<MultiSelectProps, 'data'> & {
  name: string;
  options: SelectOption[];
};

export const FormikMultiSelect = memo(function FormikMultiSelect(props: Props) {
  const {
    options,
    value,
    errorMessage,
    multiSelectProps,
    setValue,
    handleBlur,
  } = useFormikMultiSelect(props);

  return (
    <MultiSelect
      value={value}
      data={options}
      error={errorMessage}
      onChange={setValue}
      onBlur={handleBlur}
      {...multiSelectProps}
    />
  );
});

function useFormikMultiSelect(props: Props) {
  const { name, options, ...multiSelectProps } = props;
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);
  const errorMessage = touched && error;

  const handleBlur = () => setTouched(true);

  return {
    options,
    value,
    errorMessage,
    multiSelectProps,
    setValue,
    handleBlur,
  };
}
