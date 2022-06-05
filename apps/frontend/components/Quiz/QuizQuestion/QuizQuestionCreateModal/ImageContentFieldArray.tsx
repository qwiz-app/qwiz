import { memo, useEffect } from 'react';
import { Prisma, QuestionElementType } from '@prisma/client';
import { FieldArrayRenderProps } from 'formik';
import { ActionIcon, Box, Button, Group, Stack, Tooltip } from '@mantine/core';
import { useFileUpload } from 'hooks/use-flle-upload';
import { FileUpload } from 'components/UI/FileUpload';
import { Trash, X } from 'phosphor-react';

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
    <Stack spacing={6}>
      <FileUpload uploadFile={uploadFile} url={url} loading={loading} />
      <Group position="right">
        <Tooltip label="Remove image" position="top" placement="end">
          <ActionIcon onClick={resetImageUrl} disabled={!url}>
            <X size={16} weight="duotone" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete image field" position="top" placement="end">
          <ActionIcon onClick={removeItem} disabled={disabled}>
            <Trash size={16} weight="duotone" />
          </ActionIcon>
        </Tooltip>
      </Group>
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

  return (
    <Stack>
      {images.map(renderImageField)}
      <Box>
        <Button
          onClick={handleAddItem}
          variant="light"
          disabled={isMaxItemsLimit}
        >
          Add another image
        </Button>
      </Box>
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
