import { ActionIcon, Button, Group, Stack, Tooltip } from '@mantine/core';
import { Prisma, QuestionElementType } from '@prisma/client';
import { FileUpload } from 'components/UI/FileUpload';
import { FieldArrayRenderProps } from 'formik';
import { useBreakpoints } from 'hooks/breakpoints';
import { useFileUpload } from 'hooks/use-flle-upload';
import { ImageSquare, Trash, X } from 'phosphor-react';
import { memo, useEffect } from 'react';

type Props = {
  images: Prisma.QuestionContentCreateWithoutQuestionInput[];
  ah: FieldArrayRenderProps;
};

type QuestionImageUploadFieldProps = {
  removeItem: () => void;
  replaceItem: (url?: string) => void;
  disabled?: boolean;
};

const QuestionImageUploadField = ({
  removeItem,
  replaceItem,
  disabled,
}: QuestionImageUploadFieldProps) => {
  const { uploadFile, url, loading, resetUploadedFile } = useFileUpload();
  const resetImageUrl = () => {
    replaceItem('');
    resetUploadedFile();
  };

  useEffect(() => {
    if (url) {
      replaceItem(url);
    }
  }, [url]);

  return (
    <Stack spacing={6} sx={{ flex: 1 }}>
      <FileUpload uploadFile={uploadFile} url={url} loading={loading} />
      {(url || !disabled) && (
        <Group position="right" spacing={4} mb="sm">
          {url && (
            <Tooltip label="Remove image" position="top" placement="end">
              <ActionIcon variant="outline" onClick={resetImageUrl}>
                <X size={16} weight="duotone" />
              </ActionIcon>
            </Tooltip>
          )}
          {!disabled && (
            <Tooltip label="Delete field" position="top" placement="end">
              <ActionIcon variant="filled" onClick={removeItem} color="red">
                <Trash size={16} weight="duotone" />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      )}
    </Stack>
  );
};

export const ImageContentFieldArray = memo(function ImageContentFieldArray(
  props: Props
) {
  const {
    images,
    isLastItem,
    isMaxItemsLimit,
    generateFieldMethods,
    handleAddItem,
  } = useImageContentFieldArray(props);

  const renderImageField = (
    image: Prisma.QuestionContentCreateWithoutQuestionInput,
    index: number
  ) => {
    const methods = generateFieldMethods(image, index);

    return (
      <QuestionImageUploadField
        key={index}
        {...methods}
        disabled={isLastItem}
      />
    );
  };

  const { matches } = useBreakpoints();

  return (
    <Stack spacing="xs">
      <Group
        direction={matches.max.sm ? 'column' : 'row'}
        align={matches.max.sm ? 'stretch' : 'start'}
      >
        {images.map(renderImageField)}
      </Group>
      <Group sx={{ width: '100%' }} position="right">
        <Button
          onClick={handleAddItem}
          variant="light"
          disabled={isMaxItemsLimit}
          leftIcon={<ImageSquare size={20} weight="duotone" />}
        >
          Add another
        </Button>
      </Group>
    </Stack>
  );
});

function useImageContentFieldArray(props: Props) {
  const { images, ah } = props;

  const isLastItem = images?.length === 1 ?? true;

  const isMaxItemsLimit = images?.length === 2 ?? false;

  const { push, remove, replace } = ah;

  const generateFieldMethods = (
    item: Prisma.QuestionContentCreateWithoutQuestionInput,
    index: number
  ) => ({
    removeItem: () => {
      if (images.length) {
        remove(index);
      }
    },
    replaceItem: (url?: string) => replace(index, { ...item, content: url }),
  });

  const handleAddItem = () =>
    isMaxItemsLimit
      ? null
      : push({ content: '', type: QuestionElementType.IMAGE });

  return {
    images,
    isLastItem,
    isMaxItemsLimit,
    generateFieldMethods,
    handleAddItem,
  };
}
