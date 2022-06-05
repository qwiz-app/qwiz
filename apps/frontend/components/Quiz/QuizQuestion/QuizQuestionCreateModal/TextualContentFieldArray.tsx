import { ChangeEvent, memo } from 'react';
import { FieldArrayRenderProps } from 'formik';
import {
  ActionIcon,
  Box,
  Button,
  Stack,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Prisma, QuestionElementType } from '@prisma/client';
import { Trash } from 'phosphor-react';
import { useInputAccentStyles } from 'components/UI/use-input-styles';

type Props = {
  textuals: Prisma.QuestionContentCreateWithoutQuestionInput[];
  ah: FieldArrayRenderProps;
};

const RightSection = ({ handleDelete, disabled }) => (
  <Tooltip label="Delete question" position="top" placement="end">
    <ActionIcon onClick={handleDelete} disabled={disabled}>
      <Trash size={16} />
    </ActionIcon>
  </Tooltip>
);

export const TextualContentFieldArray = memo(function TextualContentFieldArray(
  props: Props
) {
  const {
    textuals,
    isLastItem,
    isMaxItemsLimit,
    classes,
    generateFieldMethods,
    handleAddItem,
  } = useTextualContentFieldArray(props);

  const renderTextual = (
    textual: Prisma.QuestionContentCreateWithoutQuestionInput,
    index: number
  ) => {
    const { replaceItem, removeItem } = generateFieldMethods(textual, index);

    return (
      <TextInput
        classNames={classes}
        key={index}
        value={textual.content}
        onChange={replaceItem}
        size="md"
        placeholder="Enter question content"
        rightSection={
          <RightSection handleDelete={removeItem} disabled={isLastItem} />
        }
      />
    );
  };

  return (
    <Stack>
      {textuals.map(renderTextual)}
      <Box>
        <Button
          onClick={handleAddItem}
          variant="light"
          disabled={isMaxItemsLimit}
        >
          Add more textual content
        </Button>
      </Box>
    </Stack>
  );
});

function useTextualContentFieldArray(props: Props) {
  const { textuals, ah } = props;

  const isLastItem = textuals?.length === 1 ?? true;

  const isMaxItemsLimit = textuals?.length === 2 ?? false;

  const { push, remove, replace } = ah;

  const { classes } = useInputAccentStyles();

  const generateFieldMethods = (
    item: Prisma.QuestionContentCreateWithoutQuestionInput,
    index: number
  ) => ({
    removeItem: () => {
      if (!isLastItem) {
        remove(index);
      }
    },
    replaceItem: (e: ChangeEvent<HTMLInputElement>) =>
      replace(index, { ...item, content: e.target.value }),
  });

  const handleAddItem = () =>
    isMaxItemsLimit
      ? null
      : push({ content: '', type: QuestionElementType.TEXT });

  return {
    textuals,
    isLastItem,
    isMaxItemsLimit,
    classes,
    generateFieldMethods,
    handleAddItem,
  };
}
