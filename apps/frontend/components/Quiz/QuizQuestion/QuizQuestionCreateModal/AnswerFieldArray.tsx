import { ChangeEvent, memo } from 'react';
import { Prisma } from '@prisma/client';
import { FieldArrayRenderProps, FormikErrors } from 'formik';
import {
  ActionIcon,
  Box,
  Button,
  Stack,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Trash } from 'phosphor-react';
import { useInputAccentStyles } from 'components/UI/use-input-styles';

type Props = {
  answers: Prisma.AnswerCreateWithoutQuestionInput[];
  ah: FieldArrayRenderProps;
  errors: FormikErrors<any>;
};

const RightSection = ({ handleDelete, disabled }) => (
  <Tooltip label="Delete question" position="top" placement="end">
    <ActionIcon onClick={handleDelete} disabled={disabled}>
      <Trash size={16} />
    </ActionIcon>
  </Tooltip>
);

export const AnswerFieldArray = memo(function AnswerFieldArray(props: Props) {
  const { answers, isLastItem, classes, generateFieldMethods, handleAddItem } =
    useAnswerFieldArray(props);

  const renderAnswerField = (
    answer: Prisma.AnswerCreateWithoutQuestionInput,
    index: number
  ) => {
    const { replaceItem, removeItem, getError } = generateFieldMethods(
      answer,
      index
    );

    return (
      <TextInput
        classNames={classes}
        key={index}
        value={answer.answer}
        onChange={replaceItem}
        size="md"
        placeholder="Enter answer"
        error={getError()}
        rightSection={
          <RightSection handleDelete={removeItem} disabled={isLastItem} />
        }
      />
    );
  };

  return (
    <Stack>
      {answers.map(renderAnswerField)}
      <Box>
        <Button onClick={handleAddItem} variant="light">
          Add another answer
        </Button>
      </Box>
    </Stack>
  );
});

function useAnswerFieldArray(props: Props) {
  const { answers, ah, errors } = props;

  const isLastItem = answers?.length === 1 ?? true;

  const { push, remove, replace } = ah;

  const { classes } = useInputAccentStyles();

  const generateFieldMethods = (
    item: Prisma.AnswerCreateWithoutQuestionInput,
    index: number
  ) => ({
    removeItem: () => {
      if (!isLastItem) {
        remove(index);
      }
    },
    replaceItem: (e: ChangeEvent<HTMLInputElement>) =>
      replace(index, { ...item, answer: e.target.value }),
    getError: () => {
      const itemError = errors?.answers?.[index]?.answer ?? null;
      return itemError || undefined;
    },
  });

  const handleAddItem = () => push({ answer: '' });

  return {
    answers,
    isLastItem,
    classes,
    generateFieldMethods,
    handleAddItem,
  };
}
