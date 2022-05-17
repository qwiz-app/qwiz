import { Box, Stack } from '@mantine/core';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useAvailableQuestions } from 'hooks/api/question';
import QuizQuestionCard from './QuizQuestion/QuizQuestionCard';
import { SidePanelWrapper } from './SidePanelWrapper';

interface Props {
  onSelectQuestion: (questionId: string) => void;
}

export const SidePanelQuestions = ({ onSelectQuestion }: Props) => {
  const { data: questions } = useAvailableQuestions();

  return (
    <SidePanelWrapper title="Available questions">
      {/* TODO: height, scroll and overflow troubles */}
      <Box component={ThinScrollArea} style={{ height: '100%' }}>
        <Stack spacing={8}>
          {questions?.map((question) => (
            <QuizQuestionCard
              key={question.id}
              question={question}
              onSelect={onSelectQuestion}
            />
          ))}
        </Stack>
      </Box>
    </SidePanelWrapper>
  );
};
