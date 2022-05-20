import {
  Box,
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { FileUpload } from 'components/UI/FileUpload';
import { useModalProps } from 'context/mantine';
import { useQuestionCreate } from 'hooks/api/question';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useEffect, useState } from 'react';

export const QuestionCreateModal = ({ opened, setOpened }) => {
  const { mutate: createQuestion } = useQuestionCreate();

  const [textual, setTextual] = useState({
    0: {
      content: null,
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

    createQuestion({ contents });
  };

  const modalProps = useModalProps();

  return (
    <Modal
      {...modalProps}
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a new question"
    >
      <Stack>
        <Stack>
          {Object.keys(textual).map((key, index) => (
            <TextInput
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
