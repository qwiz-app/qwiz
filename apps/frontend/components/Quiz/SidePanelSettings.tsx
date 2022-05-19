import { Button } from '@mantine/core';
import { FileUpload } from 'components/UI/FileUpload';
import { useQuiz, useQuizUpdate } from 'hooks/api/quiz';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useRouter } from 'next/router';
import { TrashSimple } from 'phosphor-react';
import { useEffect } from 'react';
import { SidePanelWrapper } from './SidePanelWrapper';

export const SidePanelSettings = (props) => {
  const router = useRouter();
  const { quizId } = router.query;

  const { uploadFile, uploadingStatus, url } = useFileUpload();

  const { data: quiz } = useQuiz(quizId as string);
  const { mutate: updateQuiz } = useQuizUpdate(quizId as string);

  useEffect(() => {
    if (url) {
      updateQuiz({
        thumbnail: url,
      });
    }
  }, [url]);

  return (
    <SidePanelWrapper title="Settings">
      <Button
        rightIcon={<TrashSimple size={24} weight="duotone" />}
        size="md"
        color="red"
      >
        Delete quiz
      </Button>
      <FileUpload
        uploadFile={uploadFile}
        loading={uploadingStatus === 'UPLOADING'}
        url={url ?? quiz?.thumbnail}
      />
    </SidePanelWrapper>
  );
};
