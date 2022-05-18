import RichText from 'components/Event/EventRichText';
import { memo } from 'react';
import { Box, Paper, Text } from '@mantine/core';
import { useField } from 'formik';

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
      <Text mb="4px" size="sm">
        {label}
      </Text>
      <Paper
        sx={() => ({
          minHeight: 400,
        })}
        radius="md"
        p="xl"
      >
        <RichText
          sx={(t) => ({
            backgroundColor: 'inherit',
            border: 'none',
            fontSize: 16,
          })}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Paper>
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
