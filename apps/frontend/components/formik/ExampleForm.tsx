import { memo } from 'react';
import { Form } from 'formik';
import { Box, Button } from '@mantine/core';
import { FormikTextInput } from 'components/formik/FormikTextInput';
import { FormikSelect } from './FormikSelect';
import { FormikMultiSelect } from './FormikMultiSelect';
import { FormikAutocomplete } from './FormikAutocomplete';
import { FormikCheckboxGroup } from './FormikCheckboxGroup';
import { FormikCheckbox } from './FormikCheckbox';
import { FormikRadioGroup } from './FormikRadioGroup';

type Props = Record<string, never>;

export const ExampleForm = memo(function ExampleForm(props: Props) {
  const {
    countryOptions,
    programmersOptions,
    animalOptions,
    termsOptions,
    radioOptions,
  } = useExampleForm(props);

  return (
    <Form>
      <FormikTextInput name="firstName" label="First name" />
      <FormikTextInput name="lastName" label="Last name" />
      <FormikSelect name="country" label="Country" options={countryOptions} />
      <FormikMultiSelect
        name="programmers"
        label="Programmers"
        options={programmersOptions}
      />
      <FormikAutocomplete
        name="animal"
        label="Animals"
        options={animalOptions}
      />
      <Box sx={{ marginTop: '20px', marginBottom: '20xp' }}>
        <FormikCheckbox
          name="termsAndCon"
          label="Agree to terms and conditions"
        />
      </Box>
      <FormikCheckboxGroup name="terms" label="Terms" options={termsOptions} />
      <FormikRadioGroup
        name="radio"
        label="World cup 2022 winners"
        options={radioOptions}
      />
      <Button type="submit" sx={{ marginTop: '20px' }}>
        Submit
      </Button>
    </Form>
  );
});

const useExampleForm = (props: Props) => {
  const countryOptions = [
    {
      value: 'HR',
      label: 'Croatia',
    },
    {
      value: 'US',
      label: 'United States',
    },
    {
      value: 'FR',
      label: 'France',
    },
  ];

  const programmersOptions = [
    {
      value: 'mb',
      label: 'Marian',
    },
    {
      value: 'mj',
      label: 'Mislav',
    },
    {
      value: 'mt',
      label: 'Matija',
    },
  ];

  const animalOptions = [
    {
      value: 'lion',
      label: 'Lion',
    },
    {
      value: 'tiger',
      label: 'Tiger',
    },
    {
      value: 'ant',
      label: 'Ant',
    },
  ];

  const termsOptions = [
    {
      value: 'matijaPolicy',
      label: 'Matija Policy',
    },
    {
      value: 'mislavTerms',
      label: 'Mislav terms',
    },
    {
      value: 'agreeOnDataCollection',
      label: 'Agree on data collection',
    },
  ];

  const radioOptions = [
    {
      value: 'hr',
      label: 'Croatia',
    },
    {
      value: 'de',
      label: 'Germany',
    },
    {
      value: 'es',
      label: 'Spain',
    },
  ];

  return {
    countryOptions,
    programmersOptions,
    animalOptions,
    termsOptions,
    radioOptions,
  };
};
