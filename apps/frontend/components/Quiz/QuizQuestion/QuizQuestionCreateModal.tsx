import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { FileUpload } from 'components/UI/FileUpload';
import { useInputAccentStyles } from 'components/UI/use-input-styles';
import { useModalProps } from 'context/mantine';
import { useQuestionCreate } from 'hooks/api/question';
import { useFileUpload } from 'hooks/use-flle-upload';
import { Trash } from 'phosphor-react';
import { useEffect, useState } from 'react';

const RightSection = ({ handleDelete }) => (
  <Tooltip label="Delete question" position="top" placement="end">
    <ActionIcon onClick={handleDelete}>
      <Trash size={16} />
    </ActionIcon>
  </Tooltip>
);

export const QuestionCreateModal = ({ opened, setOpened }) => {
  const { mutate: createQuestion, isSuccess, isLoading } = useQuestionCreate();
  const { modalProps } = useModalProps();

  // TODO: in need of complete refactor, this is a mess
  // content stays on next modal open
  const [textual, setTextual] = useState({
    0: {
      content: '',
      type: QuestionElementType.TEXT,
    },
  });
  const [images, setImages] = useState({
    0: {
      content: null,
      type: QuestionElementType.IMAGE,
    },
  });

  const handleSubmit = () => {
    const textualArr = Object.values(textual);
    const imagesArr = Object.values(images);
    const contents = [...textualArr, ...imagesArr];

    // TODO: allow deleting inputs and images when creating question
    createQuestion({ contents });
    setTextual({
      0: {
        content: '',
        type: QuestionElementType.TEXT,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setOpened(false);
    }
  }, [isSuccess]);

  const { classes } = useInputAccentStyles();

  const handleDelete = ({ key, index }) => {
    const newTextual = { ...textual };
    if (index === 0) {
      newTextual[key] = {
        content: '',
        type: QuestionElementType.TEXT,
      };
    } else {
      delete newTextual[key];
    }
    setTextual(newTextual);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a new question"
      {...modalProps}
    >
      <LoadingOverlay visible={isLoading} />
      <Stack>
        <Stack>
          {Object.keys(textual).map((key, index) => (
            <TextInput
              classNames={classes}
              key={index}
              value={textual[key].content}
              onChange={(e) =>
                setTextual({
                  ...textual,
                  [key]: {
                    content: e.target.value,
                    type: QuestionElementType.TEXT,
                  },
                })
              }
              size="md"
              placeholder="Enter question content"
              rightSection={
                <RightSection
                  handleDelete={() => handleDelete({ key, index })}
                />
              }
            />
          ))}
          <Box>
            <Button
              onClick={() =>
                setTextual({
                  ...textual,
                  [Object.keys(textual).length]: {
                    content: null,
                    type: QuestionElementType.TEXT,
                  },
                })
              }
              variant="light"
            >
              Add more textual content
            </Button>
          </Box>
        </Stack>
        <Divider variant="dashed" />
        <Stack>
          {Object.keys(images).map((key, index) => (
            <QuizQuestionImages
              key={index}
              images={images}
              setImages={setImages}
              index={key}
            />
          ))}
          <Box>
            <Button
              onClick={() =>
                setImages({
                  ...images,
                  [Object.keys(images).length]: {
                    content: null,
                    type: QuestionElementType.IMAGE,
                  },
                })
              }
              variant="light"
            >
              Add another image
            </Button>
          </Box>
        </Stack>
      </Stack>
      <Group position="right">
        <Button
          onClick={handleSubmit}
          mt="sm"
          size="md"
          disabled={!textual[0]?.content}
        >
          Create
        </Button>
      </Group>
    </Modal>
  );
};

const QuizQuestionImages = ({ images, setImages, index }) => {
  const { uploadFile, url } = useFileUpload();

  useEffect(() => {
    if (url) {
      setImages({
        ...images,
        [index]: {
          content: url,
          type: QuestionElementType.IMAGE,
        },
      });
    }
  }, [url]);

  return <FileUpload uploadFile={uploadFile} url={url} />;
};
