import { Box, Stack } from '@mantine/core';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useAvailableQuestions } from 'hooks/api/question';
import QuizQuestionCard from './QuizQuestion/QuizQuestionCard';
import { useSelectedQuestion } from './QuizQuestion/use-selected-question';
import { SidePanelWrapper } from './SidePanelWrapper';

export const SidePanelQuestions = (props) => {
  const { data: questions } = useAvailableQuestions();
  const { selectedQuestion, setSelectedQuestion } = useSelectedQuestion();

  return (
    <SidePanelWrapper title="Available questions">
      {/* TODO: height, scroll and overflow troubles */}
      <Box component={ThinScrollArea} style={{ height: '100%' }}>
        <Stack spacing={8}>
          {questions?.map((question) => (
            <QuizQuestionCard
              key={question.id}
              question={question}
              onSelect={() => setSelectedQuestion(question)}
            />
          ))}
        </Stack>
        Selected {selectedQuestion?.id ?? 'None'}
      </Box>
    </SidePanelWrapper>
  );
};
