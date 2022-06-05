import {
  ActionIcon,
  Button,
  Group,
  Stack,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Prisma } from '@prisma/client';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import { useInputAccentStyles } from 'components/UI/use-input-styles';
import { FieldArrayRenderProps, FormikErrors } from 'formik';
import { ChatText, X } from 'phosphor-react';
import { ChangeEvent, memo } from 'react';

type Props = {
  answers: Prisma.AnswerCreateWithoutQuestionInput[];
  ah: FieldArrayRenderProps;
  errors: FormikErrors<any>;
};

const RightSection = ({ handleDelete, disabled }) =>
  !disabled &&
  ((
    <Tooltip label="Delete answer" position="top" placement="end">
      <ActionIcon variant="hover" onClick={handleDelete}>
        <X size={16} weight="bold" />
      </ActionIcon>
    </Tooltip>
  ) ??
    null);

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
      <FramerAnimatedListItem id={`answer-${index}`} key={index}>
        <TextInput
          classNames={classes}
          value={answer.answer}
          onChange={replaceItem}
          size="md"
          placeholder="Enter answer"
          error={getError()}
          icon={<ChatText size={22} weight="duotone" />}
          rightSection={
            <RightSection handleDelete={removeItem} disabled={isLastItem} />
          }
        />
      </FramerAnimatedListItem>
    );
  };

  return (
    <Stack spacing="xs">
      {answers.map(renderAnswerField)}
      <Group sx={{ width: '100%' }} position="right">
        <Button
          onClick={handleAddItem}
          variant="light"
          leftIcon={<ChatText size={20} weight="duotone" />}
        >
          Add another
        </Button>
      </Group>
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
      const itemError = !!errors?.answers?.[index]?.answer;
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
