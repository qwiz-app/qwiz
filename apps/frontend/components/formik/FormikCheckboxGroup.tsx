import { memo } from 'react';
import { Checkbox, CheckboxGroup, CheckboxGroupProps } from '@mantine/core';
import { useField } from 'formik';

type CheckboxOption = {
  value: string;
  label: string;
};

type Props = Omit<CheckboxGroupProps, 'children'> & {
  name: string;
  options: CheckboxOption[];
};

export const FormikCheckboxGroup = memo(function FormikCheckboxGroup(
  props: Props
) {
  const {
    options,
    value,
    errorMessage,
    checkboxGroupProps,
    handleChange,
    handleBlur,
  } = useFormikCheckboxGroup(props);

  const renderCheckbox = (option: CheckboxOption) => (
    <Checkbox key={option.value} {...option} />
  );

  return (
    <CheckboxGroup
      value={value ?? []}
      error={errorMessage}
      onChange={handleChange}
      onBlur={handleBlur}
      {...checkboxGroupProps}
    >
      {options.map(renderCheckbox)}
    </CheckboxGroup>
  );
});

function useFormikCheckboxGroup(props: Props) {
  const { name, options, ...checkboxGroupProps } = props;
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);
  const errorMessage = touched && error;

  const handleChange = (selected: string[]) =>
    setValue(selected.length ? selected : undefined);

  const handleBlur = () => setTouched(true);

  return {
    options,
    value,
    errorMessage,
    checkboxGroupProps,
    handleChange,
    handleBlur,
  };
}
