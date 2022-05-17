import {
  ActionIcon,
  Box,
  Button,
  Chip,
  Chips,
  Collapse,
  Group,
  Stack,
  Tooltip,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { FramerAnimatedListItem } from 'components/Framer/FramerAnimatedListItem';
import { ThinScrollArea } from 'components/UI/ThinScrollArea';
import { useCurrentOrganizationInfo } from 'hooks/api/organizations';
import { useAvailableQuestions } from 'hooks/api/question';
import { Sliders } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';
import { QuizQuestionCard } from './QuizQuestion/QuizQuestionCard';
import { SelectedQuestionModalContent } from './QuizQuestion/SelectedQuestionModalContent';
import { useSelectedQuestion } from './QuizQuestion/use-selected-question';
import { SidePanelWrapper } from './SidePanelWrapper';

export const SidePanelQuestions = () => {
  const { data: questions } = useAvailableQuestions();
  const { selectedQuestion, setSelectedQuestion } = useSelectedQuestion();
  const { data: me } = useCurrentOrganizationInfo();
  const [filtersOpened, setFiltersOpened] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState('all');

  const shownQuestions = useMemo(() => {
    if (selectedFilter === 'all') {
      return questions;
    }
    if (selectedFilter === 'global') {
      return questions.filter((question) => question.owner === null);
    }
    if (selectedFilter === 'others') {
      return questions.filter((question) => question.owner.id === me.id);
    }
  }, [selectedFilter, questions]);

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

      {/* TODO: height, scroll and overflow troubles */}
      <Box component={ThinScrollArea} style={{ height: '100%' }}>
        <Stack spacing={8}>
          {shownQuestions?.map((question) => (
            <FramerAnimatedListItem key={question.id} id={question.id}>
              <QuizQuestionCard
                question={question}
                onSelect={openQuestionModal}
              />
            </FramerAnimatedListItem>
          ))}
        </Stack>
      </Box>
    </SidePanelWrapper>
  );
};
