import { Box, Text } from '@mantine/core';
import RichText from 'components/Event/EventRichText';
import { useField } from 'formik';
import { memo } from 'react';

type Props = {
  name: string;
  label: string;
};

export const FormikRichText = memo(function FormikRichText({
  name,
  label: labelProp,
}: Props) {
  const { value, label, errorMessage, handleChange, handleBlur } =
    useFormikRichText({ name, label: labelProp });

  return (
    <Box>
      <Text weight={500} size="lg">
        {label}
      </Text>

      <Box mt={8}>
        <RichText
          sx={(t) => ({
            fontSize: 18,
            minHeight: 400,
          })}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
      {errorMessage && (
        <Text mt="4px" size="sm">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
});

function useFormikRichText(props: Props) {
  const { name, label } = props;
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField(name);
  const errorMessage = touched && error;

  const handleChange = (text) => setValue(text);

  const handleBlur = () => setTouched(true);

  return { value, label, errorMessage, handleChange, handleBlur };
}
