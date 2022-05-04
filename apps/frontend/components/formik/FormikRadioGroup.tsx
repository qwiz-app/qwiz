import { memo } from 'react';
import { Radio, RadioGroup, RadioGroupProps } from '@mantine/core';
import { useField } from 'formik';

type RadioOption = {
  value: string;
  label: string;
};

type Props = Omit<RadioGroupProps, 'children'> & {
  name: string;
  options: RadioOption[];
};

export const FormikRadioGroup = memo(function FormikRadioGroup(props: Props) {
  const {
    value,
    options,
    errorMessage,
    radioGroupProps,
    setValue,
    handleBlur,
  } = useFormikRadioGroup(props);

  const renderRadio = (option: RadioOption) => (
    <Radio key={option.value} {...option} />
  );

  return (
    <RadioGroup
      value={value}
      error={errorMessage}
      onChange={setValue}
      onBlur={handleBlur}
      {...radioGroupProps}
    >
      {options.map(renderRadio)}
    </RadioGroup>
  );
});

function useFormikRadioGroup(props: Props) {
  const { name, options, ...radioGroupProps } = props;
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);
  const errorMessage = touched && error;

  const handleBlur = () => setTouched(true);

  return {
    value,
    options,
    errorMessage,
    radioGroupProps,
    setValue,
    handleBlur,
  };
}
