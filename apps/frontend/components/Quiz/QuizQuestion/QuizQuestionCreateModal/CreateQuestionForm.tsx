import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Collapse,
  Divider,
  Group,
  MultiSelectValueProps,
  SelectItemProps,
  Stack,
  Text
} from '@mantine/core';
import { QuestionCategory } from '@prisma/client';
import { FormikMultiSelect } from 'components/formik/FormikMultiSelect';
import { AnswerFieldArray } from 'components/Quiz/QuizQuestion/QuizQuestionCreateModal/AnswerFieldArray';
import { ImageContentFieldArray } from 'components/Quiz/QuizQuestion/QuizQuestionCreateModal/ImageContentFieldArray';
import { TextualContentFieldArray } from 'components/Quiz/QuizQuestion/QuizQuestionCreateModal/TextualContentFieldArray';
import { useInputAccentStyles } from 'components/UI/use-input-styles';
import { FieldArray, Form, useFormikContext } from 'formik';
import { CaretDown, PlusCircle } from 'phosphor-react';
import { forwardRef, memo, useState } from 'react';
import { QuestionCreateFormValues } from 'types/forms/QuestionCreateFormValues';

type Props = {
  categories: QuestionCategory[];
};

export const CreateQuestionForm = memo(function CreateQuestionForm(
  props: Props
) {
  const {
    errors,
    textuals,
    images,
    answers,
    categoriesOption,
    classes,
    isValid,
    isSubmitting,
  } = useCreateQuestionForm(props);

  const [textVisible, setTextVisible] = useState(true);
  const [imagesVisible, setImagesVisible] = useState(false);
  const [answersVisible, setAnswersVisible] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  return (
    <Form>
      <Stack spacing="lg">
        <Stack>
          <Group sx={{ width: '100%' }} spacing={8}>
            <Divider label="Text" labelPosition="left" sx={{ flex: 1 }} />
            <ActionIcon
              variant="light"
              onClick={() => setTextVisible((prev) => !prev)}
            >
              <CaretDown size={24} />
            </ActionIcon>
          </Group>

          <Collapse in={textVisible}>
            <FieldArray
              name="textuals"
              render={(ah) => (
                <TextualContentFieldArray
                  textuals={textuals}
                  ah={ah}
                  errors={errors}
                />
              )}
            />
          </Collapse>
        </Stack>

        <Stack>
          <Group sx={{ width: '100%' }} spacing={8}>
            <Divider label="Images" labelPosition="left" sx={{ flex: 1 }} />
            <ActionIcon
              variant="light"
              onClick={() => setImagesVisible((prev) => !prev)}
            >
              <CaretDown size={24} />
            </ActionIcon>
          </Group>

          <Collapse in={imagesVisible}>
            <FieldArray
              name="images"
              render={(ah) => (
                <ImageContentFieldArray images={images} ah={ah} />
              )}
            />
          </Collapse>
        </Stack>

        <Stack>
          <Group sx={{ width: '100%' }} spacing={8}>
            <Divider label="Answers" labelPosition="left" sx={{ flex: 1 }} />
            <ActionIcon
              variant="light"
              onClick={() => setAnswersVisible((prev) => !prev)}
            >
              <CaretDown size={24} />
            </ActionIcon>
          </Group>

          <Collapse in={answersVisible}>
            <FieldArray
              name="answers"
              render={(ah) => (
                <AnswerFieldArray answers={answers} ah={ah} errors={errors} />
              )}
            />
          </Collapse>
        </Stack>

        <Stack>
          <Group sx={{ width: '100%' }} spacing={8}>
            <Divider label="Categories" labelPosition="left" sx={{ flex: 1 }} />
            <ActionIcon
              variant="light"
              onClick={() => setCategoriesVisible((prev) => !prev)}
            >
              <CaretDown size={24} />
            </ActionIcon>
          </Group>

          <Collapse in={categoriesVisible}>
            <FormikMultiSelect
              valueComponent={Value}
              itemComponent={AutoCompleteItem}
              name="categories"
              options={categoriesOption}
              searchable
              placeholder="Pick categories"
              size="md"
              clearable
              classNames={classes}
              sx={(t) => ({ fontFamily: t.fontFamilyMonospace })}
            />
          </Collapse>
        </Stack>
      </Stack>
      <Group position="right" mt={32}>
        <Button
          type="submit"
          size="md"
          disabled={!isValid}
          loading={isSubmitting}
          leftIcon={<PlusCircle size={24} weight="duotone" />}
        >
          Create question
        </Button>
      </Group>
    </Form>
  );
});

function useCreateQuestionForm(props: Props) {
  const { categories } = props;
  const { values, errors, isValid, isSubmitting } =
    useFormikContext<QuestionCreateFormValues>();

  const { classes } = useInputAccentStyles();

  const { textuals = [], images = [], answers = [] } = values;

  const categoriesOption = categories?.map((c) => ({
    ...c,
    label: c.name,
    value: c.id,
  }));

  return {
    errors,
    textuals,
    images,
    answers,
    categoriesOption,
    classes,
    isValid,
    isSubmitting,
  };
}

type ItemProps = QuestionCategory &
  SelectItemProps & {
    id: string;
  };

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, color, name, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap sx={() => ({ width: '100%' })} position="apart">
        <Text size="sm" weight={500}>
          {name}
        </Text>
        <Badge variant="light" color={color} size="sm" radius="xl">
          {name}
        </Badge>
      </Group>
    </div>
  )
);

const Value = ({
  label,
  color,
  name,
  ...others
}: MultiSelectValueProps & QuestionCategory) => {
  return (
    <Center {...others}>
      <Badge variant="light" color={color} size="md" radius="xl">
        {name}
      </Badge>
    </Center>
  );
};
