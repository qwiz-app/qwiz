import { Badge, Group, Stack, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { EmptySlideAlert } from './EmptySlideAlert';
import { QuizQuestionCard } from './QuizQuestion/QuizQuestionCard';
import { SelectedQuestionModalContent } from './QuizQuestion/SelectedQuestionModalContent';
import { SidePanelWrapper } from './SidePanelWrapper';
import { useCurrentSlide } from './use-current-slide';

export const SidePanelSelectedQuestion = (props) => {
  const { slide, hasQuestion, answers, question } = useCurrentSlide();
  const modals = useModals();

  const hasAnswers = answers?.length > 0;
  const hasCategories = hasQuestion && question?.categories?.length > 0;
  
  const openQuestionModal = () => {
    modals.openModal({
      size: 'lg',
      title: 'Question details',
      children: <SelectedQuestionModalContent question={question} />,
    });
  };

  return (
    <SidePanelWrapper title="Selected question">
      <Stack>
        {hasQuestion && (
          <Stack spacing="lg">
            <QuizQuestionCard
              question={slide?.quizQuestion?.question}
              onSelect={openQuestionModal}
            />

            <Stack spacing={8}>
              <Text weight={600} size="md">
                Answers
              </Text>
              <Group spacing={8}>
                {hasAnswers ? (
                  answers?.map((answer) => (
                    <Badge p="sm" radius="sm" key={answer.id}>
                      {answer.answer}
                    </Badge>
                  ))
                ) : (
                  <Badge p="sm" radius="sm" color="red">
                    Unknown
                  </Badge>
                )}
              </Group>
            </Stack>
            <Stack spacing={8}>
              <Text weight={600} size="md">
                Categories
              </Text>
              <Group align="start" spacing={8}>
                {question.isGlobal && (
                  <Badge color="green" variant="dot" size="sm">
                    Global
                  </Badge>
                )}
                {!question.isGlobal && (
                  <Badge color="orange" variant="dot" size="sm">
                    Personal
                  </Badge>
                )}
                {hasCategories &&
                  question.categories.map((elem) => (
                    <Badge
                      variant="light"
                      color={elem.color}
                      size="sm"
                      key={elem.id}
                      radius="xl"
                    >
                      {elem.name}
                    </Badge>
                  ))}
              </Group>
            </Stack>
          </Stack>
        )}
        {!hasQuestion && <EmptySlideAlert />}
      </Stack>
    </SidePanelWrapper>
  );
};
