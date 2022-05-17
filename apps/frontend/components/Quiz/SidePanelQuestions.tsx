import { Box, Button, Group, Stack } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useAvailableQuestions } from 'hooks/api/question';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';
import { QuizQuestionCard } from './QuizQuestion/QuizQuestionCard';
import { SelectedQuestionModalContent } from './QuizQuestion/SelectedQuestionModalContent';
import { useSelectedQuestion } from './QuizQuestion/use-selected-question';
import { SidePanelWrapper } from './SidePanelWrapper';

export const SidePanelQuestions = (props) => {
  const { data: questions } = useAvailableQuestions();
  const { selectedQuestion, setSelectedQuestion } = useSelectedQuestion();
  const modals = useModals();

  const questionUseHandler = (
    question: QuestionWithContentAndOwnerAndCategoriesAndMode,
    id: string
  ) => {
    setSelectedQuestion(question);
    modals.closeModal(id);
  };

  const openQuestionModal = (
    question: QuestionWithContentAndOwnerAndCategoriesAndMode
  ) => {
    const isSelected = selectedQuestion?.id === question.id;

    const id = modals.openModal({
      title: 'Question information',
      radius: 'md',
      children: (
        <Stack pt={4}>
          <SelectedQuestionModalContent question={question} />
          <Group position="right">
            {!isSelected && (
              <Button onClick={() => questionUseHandler(question, id)}>
                Use question
              </Button>
            )}
          </Group>
        </Stack>
      ),
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
              onSelect={openQuestionModal}
            />
          ))}
        </Stack>
        Selected {selectedQuestion?.id ?? 'None'}
      </Box>
    </SidePanelWrapper>
  );
};
