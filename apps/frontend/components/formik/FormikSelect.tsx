import { memo } from 'react';
import { useField } from 'formik';
import { Select, SelectProps } from '@mantine/core';
import { useInputAccentStyles } from 'components/UI/use-input-styles';

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

  const { classes } = useInputAccentStyles();

  return (
    <Select
      classNames={classes}
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
