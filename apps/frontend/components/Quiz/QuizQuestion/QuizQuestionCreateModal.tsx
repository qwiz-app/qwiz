import { Button, Modal, TextInput } from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { FileUpload } from 'components/UI/FileUpload';
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

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a new question"
      centered
    >
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
          my="sm"
          placeholder="Enter question content"
        />
      ))}
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
        my="sm"
        variant="light"
      >
        Add more textual content
      </Button>
      {Object.keys(images).map((key, index) => (
        <QuizQuestionImages
          key={index}
          images={images}
          setImages={setImages}
          index={key}
        />
      ))}
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
        mt="md"
        mb="sm"
        variant="light"
      >
        Add another image
      </Button>
      <br />
      <Button onClick={handleSubmit} fullWidth mt="sm" disabled={!textual[0]?.content}>
        Create
      </Button>
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
