import {
  ActionIcon,
  Button,
  Chip,
  Chips,
  Collapse,
  FloatingTooltip,
  Group,
  LoadingOverlay,
  Overlay,
  Stack,
  Tooltip
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import { useCurrentOrganizationInfo } from 'hooks/api/organizations';
import { useAvailableQuestions } from 'hooks/api/question';
import { useQuizQuestionCreate } from 'hooks/api/quiz-question/use-quiz-question-create';
import { useQuizQuestionUpdate } from 'hooks/api/quiz-question/use-quiz-question-update';
import { useSlides } from 'hooks/api/slide';
import { Sliders } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';
import { QuizQuestionCard } from './QuizQuestion/QuizQuestionCard';
import { SelectedQuestionModalContent } from './QuizQuestion/SelectedQuestionModalContent';
import { useSelectedQuestion } from './QuizQuestion/use-selected-question';
import { SidePanelWrapper } from './SidePanelWrapper';
import { useCurrentQuiz } from './use-current-quiz';
import { useCurrentSlide } from './use-current-slide';

export const SidePanelQuestions = () => {
  const { data: me } = useCurrentOrganizationInfo();
  const { data: questions } = useAvailableQuestions();
  const { selectedQuestion } = useSelectedQuestion();
  const { quiz } = useCurrentQuiz();
  const { data: slides } = useSlides(quiz.id);
  const modals = useModals();

  const hasSlides = slides?.length > 0;

  const [filtersOpened, setFiltersOpened] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const shownQuestions = useMemo(() => {
    if (selectedFilter === 'all') {
      return questions;
    }
    if (selectedFilter === 'global') {
      return questions.filter((question) => question.owner === null);
    }
    if (selectedFilter === 'personal') {
      console.log(me);
      return questions.filter((question) => question.ownerId === me.id);
    }
    return [];
  }, [selectedFilter, questions]);

  const questionUseHandler = (
    question: QuestionWithContentAndOwnerAndCategoriesAndMode,
    id: string
  ) => {
    questionUseSelectedHandler(question.id);
    modals.closeModal(id);
  };

  const openQuestionModal = (
    question: QuestionWithContentAndOwnerAndCategoriesAndMode
  ) => {
    const isSelected = selectedQuestion?.id === question.id;

    const id = modals.openModal({
      title: 'Question details',
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

  const { slide, id } = useCurrentSlide();
  const { mutate: updateQuizQuestion, isLoading: updateLoading } =
    useQuizQuestionUpdate(slide?.quizQuestion?.id);
  const { mutate: createQuizQuestion, isLoading: createLoading } =
    useQuizQuestionCreate(id);

  const questionUseSelectedHandler = (questionId: string) => {
    if (slide.quizQuestion) {
      updateQuizQuestion({
        questionId,
      });
    } else {
      createQuizQuestion({
        quizId: slide.quizId,
        quizSlideId: slide.id,
        questionId,
      });
    }
  };

  return (
    <SidePanelWrapper
      title="Available questions"
      slot={
        <Tooltip label="Filters" withArrow>
          <ActionIcon
            variant="hover"
            size="md"
            onClick={() => setFiltersOpened((prev) => !prev)}
          >
            <Sliders weight="duotone" size={24} />
          </ActionIcon>
        </Tooltip>
      }
    >
      <Collapse in={filtersOpened} mb={12}>
        <Stack>
          <Chips
            multiple={false}
            value={selectedFilter}
            onChange={setSelectedFilter}
            size="sm"
          >
            <Chip value="all">All</Chip>
            <Chip value="global">Global</Chip>
            <Chip value="personal">Personal</Chip>
          </Chips>
        </Stack>
      </Collapse>

      <FloatingTooltip label="Create a slide first" disabled={hasSlides}>
        {/* TODO: height, scroll and overflow troubles */}
        <Stack spacing={8}>
          {!hasSlides && <Overlay opacity={0.5} />}
          <LoadingOverlay visible={updateLoading || createLoading} />
          {shownQuestions?.map((question) => (
            <FramerAnimatedListItem key={question.id} id={question.id}>
              <QuizQuestionCard
                question={question}
                onSelect={openQuestionModal}
                onUseQuestion={questionUseSelectedHandler}
              />
            </FramerAnimatedListItem>
          ))}
        </Stack>
      </FloatingTooltip>
    </SidePanelWrapper>
  );
};
