import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Required.',
  },
});

export const exampleSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  country: yup.string().required(),
  programmers: yup.array().of(yup.string()),
  animal: yup.string().required(),
  terms: yup.array().of(yup.string()).required(),
  termsAndCon: yup
    .boolean()
    .oneOf([true], 'You must agree to terms and conditions.'),
  radio: yup.string().required(),
});

export const createQuizSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
});

export const eventSchema = yup.object({
  name: yup.string().required(),
  location: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  teamCount: yup.number().required(),
  startDate: yup.date().required(),
  startTime: yup.date().required(),
  quizId: yup.string().required(),
});
