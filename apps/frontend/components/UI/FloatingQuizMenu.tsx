import { Button, createStyles, Group, Paper, Modal } from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import { useQuestionContentCreate } from 'hooks/api/slide';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useRouter } from 'next/router';
import { TextT, Image as ImageIcon } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { FileUpload } from './FileUpload';

export const FloatingQuizMenu = () => {
  const router = useRouter();

  const [showUploadModal, setShowUploadModal] = useState(false);

  const { slideId } = router.query;
  const { mutate } = useQuestionContentCreate(slideId as string);

  const { classes } = useStyles();

  const handleTextClick = () => {
    mutate(
      generateMutateData({
        type: QuestionElementType.TEXT,
        content: 'Edit me',
        slideId,
      })
    );
  };

  const handleImageClick = () => {
    setShowUploadModal(true);
  };

  return (
    <Paper shadow="xs" p="md" className={classes.wrapper} radius="md">
      <Group spacing="xs">
        <Button
          leftIcon={<TextT size={18} weight="duotone" />}
          variant="filled"
          onClick={handleTextClick}
          color="indigo"
        >
          Add text
        </Button>
        <Button
          leftIcon={<ImageIcon size={18} weight="duotone" />}
          variant="light"
          onClick={handleImageClick}
          color="indigo"
        >
          Add image
        </Button>
      </Group>
      <UploadImageModal
        opened={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        slideId={slideId}
      />
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'max-content',
  },
}));

interface GenerateMutateDataProps {
  type: QuestionElementType;
  content: string;
  slideId: string | string[];
}

const generateMutateData = ({
  type,
  content,
  slideId,
}: GenerateMutateDataProps) => {
  return {
    content,
    type,
    question: {
      create: {},
    },
    quizSlideElement: {
      create: [
        {
          quizSlideId: slideId as string,
          point: {
            create: {
              x: 0.5,
              y: 0.5,
              width: 300,
              height: 300,
            },
          },
        },
      ],
    },
  };
};

const UploadImageModal = ({ opened, onClose, slideId }) => {
  const { selectFile, uploadFile, uploadingStatus, url, file } =
    useFileUpload();

  const { mutate } = useQuestionContentCreate(slideId as string);

  useEffect(() => {
    if (uploadingStatus === 'UPLOADED' && opened) {
      mutate(
        generateMutateData({
          type: QuestionElementType.IMAGE,
          content: url,
          slideId,
        })
      );
      onClose();
    }
  }, [url]);

  useEffect(() => {
    if (file) {
      uploadFile();
    } 
  }, [file]);

  return (
    <Modal opened={opened} onClose={onClose}>
      <FileUpload selectFile={selectFile} />
    </Modal>
  );
};
