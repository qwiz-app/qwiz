import { ActionIcon, Group, Stack, TextInput, Tooltip } from '@mantine/core';
import { Prisma, QuestionElementType } from '@prisma/client';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import { useInputAccentStyles } from 'components/UI/use-input-styles';
import { FieldArrayRenderProps, FormikErrors } from 'formik';
import { useAppColorscheme } from 'hooks/colorscheme';
import { PlusCircle, TextT, X } from 'phosphor-react';
import { ChangeEvent, memo } from 'react';

type Props = {
  textuals: Prisma.QuestionContentCreateWithoutQuestionInput[];
  ah: FieldArrayRenderProps;
  errors?: FormikErrors<any>;
};

const RightSection = ({ handleDelete, disabled }) =>
  (!disabled && (
    <Tooltip label="Delete question" position="top" placement="end">
      <ActionIcon onClick={handleDelete}>
        <X size={16} weight="bold" />
      </ActionIcon>
    </Tooltip>
  )) ??
  null;

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
  const { isDark } = useAppColorscheme();

  const renderTextual = (
    textual: Prisma.QuestionContentCreateWithoutQuestionInput,
    index: number
  ) => {
    const { replaceItem, removeItem, getError } = generateFieldMethods(
      textual,
      index
    );

    return (
      <FramerAnimatedListItem id={`textual-content-${index}`}>
        <Group
          align="start"
          sx={{ width: '100%' }}
          position="apart"
          spacing="xs"
        >
          <TextInput
            sx={{ flex: 1 }}
            classNames={classes}
            key={index}
            value={textual.content}
            onChange={replaceItem}
            size="md"
            placeholder="Enter question"
            error={getError()}
            icon={<TextT size={22} weight="duotone" />}
            rightSection={
              <RightSection handleDelete={removeItem} disabled={isLastItem} />
            }
          />
          {!isMaxItemsLimit && (
            <Tooltip label="Add another">
              <ActionIcon
                size={42}
                onClick={handleAddItem}
                variant="filled"
                color={isDark ? 'orange' : 'dark'}
                disabled={isMaxItemsLimit}
              >
                <PlusCircle size={24} weight="duotone" />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </FramerAnimatedListItem>
    );
  };

  return <Stack>{textuals.map(renderTextual)}</Stack>;
});

function useTextualContentFieldArray(props: Props) {
  const { textuals, ah, errors } = props;

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
    getError: () => {
      const itemError = !!errors?.textuals?.[index]?.content;
      return itemError || undefined;
    },
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
