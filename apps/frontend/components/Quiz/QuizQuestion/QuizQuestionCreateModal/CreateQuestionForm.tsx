import { memo } from 'react';
import { Button, Divider, Group, Stack } from '@mantine/core';
import { FieldArray, Form, useFormikContext } from 'formik';
import { TextualContentFieldArray } from 'components/Quiz/QuizQuestion/QuizQuestionCreateModal/TextualContentFieldArray';
import { ImageContentFieldArray } from 'components/Quiz/QuizQuestion/QuizQuestionCreateModal/ImageContentFieldArray';
import { QuestionCreateFormValues } from 'types/forms/QuestionCreateFormValues';
import { QuestionCategory } from '@prisma/client';
import { FormikMultiSelect } from 'components/formik/FormikMultiSelect';
import { useInputAccentStyles } from 'components/UI/use-input-styles';

type Props = {
  categories: QuestionCategory[];
};

export const CreateQuestionForm = memo(function CreateQuestionForm(
  props: Props
) {
  const { textuals, images, categoriesOption, classes, isValid, isSubmitting } =
    useCreateQuestionForm(props);

  return (
    <Form>
      <Stack>
        <FormikMultiSelect
          name="categories"
          options={categoriesOption}
          searchable
          placeholder="Select question categories"
          size="md"
          classNames={classes}
        />
        <Divider variant="dashed" />
        <FieldArray
          name="textuals"
          render={(ah) => (
            <TextualContentFieldArray textuals={textuals} ah={ah} />
          )}
        />
        <Divider variant="dashed" />
        <FieldArray
          name="images"
          render={(ah) => <ImageContentFieldArray images={images} ah={ah} />}
        />
        <Divider variant="dashed" />
      </Stack>
      <Group position="right">
        <Button
          type="submit"
          mt="sm"
          size="md"
          disabled={!isValid}
          loading={isSubmitting}
        >
          Create
        </Button>
      </Group>
    </Form>
  );
});

function useCreateQuestionForm(props: Props) {
  const { categories } = props;
  const { values, isValid, isSubmitting } =
    useFormikContext<QuestionCreateFormValues>();

  const { classes } = useInputAccentStyles();

  const { textuals = [], images = [] } = values;

  const categoriesOption = categories?.map((c) => ({
    ...c,
    label: c.name,
    value: c.id,
  }));

  return { textuals, images, categoriesOption, classes, isValid, isSubmitting };
}
