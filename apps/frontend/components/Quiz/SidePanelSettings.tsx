import { Button, Divider, Stack, Text, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { FileUpload } from 'components/UI/FileUpload';
import { useGeneratePdf } from 'hooks/api/aws';
import { useQuizDelete, useQuizUpdate } from 'hooks/api/quiz';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { FilePdf, TrashSimple } from 'phosphor-react';
import { useEffect } from 'react';
import { SidePanelWrapper } from './SidePanelWrapper';
import { useCurrentQuiz } from './use-current-quiz';

export const SidePanelSettings = (props) => {
  const { uploadFile, loading, url } = useFileUpload();
  const router = useRouter();
  const { mutate: generatePdf, data: pdf, isLoading } = useGeneratePdf();

  const { quiz, id } = useCurrentQuiz();
  const { mutate: updateQuiz } = useQuizUpdate(id);
  const {
    mutate: deleteQuiz,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
  } = useQuizDelete(quiz?.id);

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

  const exportHandler = () => {
    generatePdf({
      id,
    });
  };

  return (
    <SidePanelWrapper title="Settings">
      <Stack>
        <Stack spacing={4}>
          <Text weight={600} size="md">
            Thumnbail
          </Text>
          <FileUpload
            uploadFile={uploadFile}
            loading={loading}
            url={url ?? quiz?.thumbnail}
          />
        </Stack>
        <Divider labelPosition="center" label="Options" />

        <Stack spacing="xs">
          <Button
            leftIcon={<FilePdf size={22} weight="duotone" />}
            onClick={exportHandler}
            size="md"
            loading={isLoading}
          >
            Export as PDF..
          </Button>
          {pdf && (
            <Button
              size="md"
              variant="outline"
              onClick={() => window.open(pdf.url)}
              leftIcon={<FilePdf size={22} weight="duotone" />}
            >
              View PDF
            </Button>
          )}
          <Tooltip
            position="bottom"
            label="Quiz is already being used in an event"
            disabled={!isPublished}
          >
            <Button
              leftIcon={<TrashSimple size={22} weight="duotone" />}
              color="red"
              size="md"
              fullWidth
              variant="filled"
              onClick={openDeleteConfirmModal}
              loading={isDeleteLoading}
              disabled={isPublished}
            >
              Delete quiz
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </SidePanelWrapper>
  );
};
