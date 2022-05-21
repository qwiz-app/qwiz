import { Button, Stack, Title, Tooltip } from '@mantine/core';
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

  // eslint-disable-next-line no-underscore-dangle
  const isPublished = quiz?._count?.event > 0 ?? false;

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

        <Tooltip
          position="bottom"
          label="Quiz is already being used in an event"
          disabled={!isPublished}
        >
          <Button
            rightIcon={<TrashSimple size={24} weight="duotone" />}
            color="red"
            size="md"
            fullWidth
            onClick={openDeleteConfirmModal}
            loading={isDeleteLoading}
            disabled={isPublished}
          >
            Delete quiz
          </Button>
        </Tooltip>
      </Stack>
    </SidePanelWrapper>
  );
};
