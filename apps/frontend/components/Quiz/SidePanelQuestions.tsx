import { Box, Stack } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useAvailableQuestions } from 'hooks/api/question';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';
import QuizQuestionCard from './QuizQuestion/QuizQuestionCard';
import { SelectedQuestionModalContent } from './QuizQuestion/SelectedQuestionModalContent';
import { useSelectedQuestion } from './QuizQuestion/use-selected-question';
import { SidePanelWrapper } from './SidePanelWrapper';

export const SidePanelQuestions = (props) => {
  const { data: questions } = useAvailableQuestions();
  const { selectedQuestion, setSelectedQuestion } = useSelectedQuestion();
  const modals = useModals();

  const clickedQuestionHandler = (
    question: QuestionWithContentAndOwnerAndCategoriesAndMode
  ) => {
    setSelectedQuestion(question);
    modals.openModal({
      title: 'Selected question',
      radius: 'md',
      children: <SelectedQuestionModalContent question={question} />,
    });
  };

  return (
    <SidePanelWrapper title="Available questions">
      {/* TODO: height, scroll and overflow troubles */}
      <Box component={ThinScrollArea} style={{ height: '100%' }}>
        <Stack spacing={8}>
          {questions?.map((question) => (
            <QuizQuestionCard
              key={question.id}
              question={question}
              onSelect={clickedQuestionHandler}
            />
          ))}
        </Stack>
        Selected {selectedQuestion?.id ?? 'None'}
      </Box>
    </SidePanelWrapper>
  );
};
