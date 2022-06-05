import {
  Avatar,
  AvatarsGroup,
  Badge,
  Button,
  createStyles,
  Group,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { QuestionElementType } from '@prisma/client';
import { SelectedQuestionModalContent } from 'components/Quiz/QuizQuestion/SelectedQuestionModalContent';
import { useQuestionDelete, useQuestionUpdate } from 'hooks/api/question';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import { useQuestionContents } from 'hooks/use-question-contents';
import { DateTimeFormat, formatDate } from 'lib/utils';
import { Lightning, LightningSlash, TrashSimple } from 'phosphor-react';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

interface Props {
  question: QuestionWithContentAndCategoriesAndMode;
  onRowClick?: (question: QuestionWithContentAndCategoriesAndMode) => void;
}

export const QuestionTableRow = ({ question, onRowClick }: Props) => {
  const { classes } = useStyles();
  const { textualContent, imageContent, categories, hasCategories } =
    useQuestionContents(question);
  const categoryLimit = 2;
  const modals = useModals();

  const rowClickHandler = (e) => {
    openQuestionDetailsModal();
    onRowClick?.(question);
  };

  const { mutate: deleteQuestion } = useQuestionDelete(question.id);
  const { mutate: updateQuestion } = useQuestionUpdate(question.id);

  const openDeleteConfirmModal = useDeleteConfirmModal({
    onConfirm: () => {
      deleteQuestion();
      modals.closeAll();
      showNotification({
        title: 'Question deleted',
        message: 'Question has successfully been deleted',
        color: 'green',
      });
    },
    deletedEntity: 'question',
  });

  const toggleActiveState = () => {
    updateQuestion(
      {
        isActive: !question.isActive,
      },
    );
    modals.closeAll();
  };

  const openQuestionDetailsModal = () => {
    const { isGlobal } = question;

    modals.openModal({
      size: 'lg',
      title: 'Question details',
      children: (
        <Stack pt={4}>
          <SelectedQuestionModalContent question={question} />
          {!isGlobal && (
            <Group position="right">
              {question?.isActive ? (
                <Button
                  color="red"
                  variant="subtle"
                  rightIcon={<LightningSlash size={20} weight="duotone" />}
                  onClick={toggleActiveState}
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  color="green"
                  variant="subtle"
                  rightIcon={<Lightning size={20} weight="duotone" />}
                  onClick={toggleActiveState}
                >
                  Activate
                </Button>
              )}
              <Button
                color="red"
                rightIcon={<TrashSimple size={20} weight="duotone" />}
                onClick={openDeleteConfirmModal}
              >
                Delete
              </Button>
            </Group>
          )}
        </Stack>
      ),
    });
  };

  return (
    <tr key={question.id} onClick={rowClickHandler} className={classes.row}>
      <td>
        <Group spacing="sm" align="baseline">
          {textualContent
            .filter((c) => c.type === QuestionElementType.TEXT)
            .slice(0, 1)
            .map((c) => (
              <Text key={c.id} size="md" lineClamp={1}>
                {c.content}
              </Text>
            ))}
          {textualContent?.length > 1 && (
            <Text weight={500} size="sm" color="dimmed">
              + {textualContent.length - 1} more
            </Text>
          )}
        </Group>
      </td>
      <td>
        <AvatarsGroup
          limit={3}
          sx={() => ({
            height: 40,
          })}
          radius="md"
        >
          {imageContent?.map((c) => (
            <Avatar src={c.content} key={c.id} />
          ))}
        </AvatarsGroup>
      </td>
      <td>
        <Stack align="start">
          {question.isGlobal ? (
            <Badge color="green" variant="dot" size="sm">
              Global
            </Badge>
          ) : (
            <Badge color="orange" variant="dot" size="sm">
              Personal
            </Badge>
          )}
        </Stack>
      </td>
      <td>
        {hasCategories ? (
          <Group spacing={2}>
            {categories?.slice(0, categoryLimit).map((elem) => (
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
            {categories?.length > categoryLimit && (
              <Text ml={4} weight={500} size="sm" color="dimmed">
                + {categories.length - 1}
              </Text>
            )}
          </Group>
        ) : null}
      </td>
      <td>
        <Tooltip
          label={formatDate(question.createdAt)}
          position="right"
          withArrow
          gutter={8}
        >
          <Text size="xs" color="dimmed">
            {formatDate(question.createdAt, DateTimeFormat.DATE)}
          </Text>
        </Tooltip>
      </td>
      <td>
        <Stack align="start">
          {question.isActive ? (
            <Badge color="green" variant="outline" size="sm">
              Active
            </Badge>
          ) : (
            <Badge color="red" variant="outline" size="sm">
              Inactive
            </Badge>
          )}
        </Stack>
      </td>
    </tr>
  );
};

const useStyles = createStyles((theme) => ({
  row: {
    cursor: 'pointer',
  },
}));
