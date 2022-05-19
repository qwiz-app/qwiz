import { Box, Button, Stack, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FileUpload } from 'components/UI/FileUpload';
import { useQuizDelete, useQuizUpdate } from 'hooks/api/quiz';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { TrashSimple } from 'phosphor-react';
import { useEffect } from 'react';
import { SidePanelWrapper } from './SidePanelWrapper';
import { useCurrentQuiz } from './use-current-quiz';

export const SidePanelSettings = (props) => {
  const { uploadFile, isUploading, url } = useFileUpload();
  const router = useRouter();

  const { quiz, id } = useCurrentQuiz();
  const { mutate: updateQuiz } = useQuizUpdate(id);
  const {
    mutate: deleteQuiz,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
  } = useQuizDelete(quiz.id);

  useEffect(() => {
    if (url) {
      updateQuiz({
        thumbnail: url,
      });
    }
  }, [url]);

  const openDeleteConfirmModal = useDeleteConfirmModal({
    onConfirm: () => {
      deleteQuiz();
    },
    deletedEntity: 'quiz',
  });

  useEffect(() => {
    if (isDeleteSuccess) {
      router.push(paths.quiz());
      showNotification({
        title: 'Quiz deleted',
        message: 'Quiz has successfully been deleted',
        color: 'green',
      });
    }
  }, [isDeleteSuccess]);

  return (
    <SidePanelWrapper title="Settings">
      <Stack>
        <Stack>
          <Title order={6}>Thumnbail</Title>
          <FileUpload
            uploadFile={uploadFile}
            loading={isUploading}
            url={url ?? quiz?.thumbnail}
          />
        </Stack>
        <Box>
          <Button
            rightIcon={<TrashSimple size={24} weight="duotone" />}
            color="red"
            size="md"
            fullWidth
            onClick={openDeleteConfirmModal}
            loading={isDeleteLoading}
          >
            Delete quiz
          </Button>
        </Box>
      </Stack>
    </SidePanelWrapper>
  );
};
