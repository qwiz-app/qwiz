import { memo, forwardRef, useState } from 'react';
import { Autocomplete, AutocompleteProps } from '@mantine/core';
import { useField } from 'formik';
import { useInputAccentStyles } from 'components/UI/use-input-styles';

export type AutocompleteOption = {
  value: string;
  label: string;
};

type Props = Omit<AutocompleteProps, 'data'> & {
  name: string;
  options: AutocompleteOption[];
};

export const FormikAutocomplete = memo(function FormikAutocomplete(
  props: Props
) {
  const {
    displayedValue,
    options,
    errorMessage,
    autocompleteProps,
    handleChange,
    handleItemSubmit,
    handleBlur,
  } = useFormikAutocomplete(props);

  const { classes } = useInputAccentStyles();

  const AutocompleteOptionItem = forwardRef<HTMLDivElement, AutocompleteOption>(
    function AutocompleteOptionItem({ label, ...rest }, ref) {
      return (
        <div ref={ref} {...rest}>
          <p>{label}</p>
        </div>
      );
    }
  );

  return (
    <Autocomplete
      classNames={classes}
      value={displayedValue}
      onChange={handleChange}
      onBlur={handleBlur}
      data={options}
      error={errorMessage}
      itemComponent={AutocompleteOptionItem}
      onItemSubmit={handleItemSubmit}
      {...autocompleteProps}
    />
  );
});

function useFormikAutocomplete(props: Props) {
  const { name, options, ...autocompleteProps } = props;
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);
  const findOption = () => options.find((o) => o.value === value);
  const [currentInput, setCurrentInput] = useState<string>(
    findOption()?.value ?? ''
  );
  const errorMessage = touched && error;

  const displayedValue = findOption()?.label ?? currentInput;

  const handleChange = (inputValue) => {
    if (inputValue !== displayedValue) {
      setValue('');
    }
    setCurrentInput(inputValue);
  };

  const handleItemSubmit = (option) => {
    setValue(option.value);
  };

  const handleBlur = () => setTouched(true);

  return {
    displayedValue,
    options,
    errorMessage,
    autocompleteProps,
    handleChange,
    handleItemSubmit,
    handleBlur,
  };
}
