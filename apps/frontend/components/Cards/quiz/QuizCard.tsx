import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  createStyles,
  FloatingTooltip,
  Group,
  Image,
  LoadingOverlay,
  Menu,
  Skeleton,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useQuizDelete, useQuizNameEdit } from 'hooks/api/quiz';
import { useAppColorscheme } from 'hooks/colorscheme';
import { relativeTimeTo } from 'lib/utils';
import { useRouter } from 'next/router';
import {
  DotsThreeVertical,
  Globe,
  ImageSquare,
  LinkSimple,
  Lock,
  PencilSimpleLine,
  TrashSimple,
} from 'phosphor-react';
import React, { SyntheticEvent } from 'react';
import { QuizWithOrganization } from 'types/quiz';
import { useCardStyles } from '../use-card-styles';
import QuizNameEditInput from './QuizNameEditInput';

interface QuizCardProps {
  quiz: QuizWithOrganization;
  loading: boolean;
}

export const QuizCard = ({
  className,
  quiz,
  loading,
  ...others
}: QuizCardProps &
  Omit<React.ComponentPropsWithoutRef<'div'>, keyof QuizCardProps>) => {
  const { classes, cx } = useStyles();
  const { classes: classesCard } = useCardStyles();
  const { isDark } = useAppColorscheme();
  const { owner } = quiz;

  const router = useRouter();
  const modals = useModals();
  const { mutate: deleteQuiz, isLoading: isDeleteLoading } = useQuizDelete(
    quiz.id
  );
  const {
    editedName,
    setEditedName,
    isEditMode,
    isLoading: isEditLoading,
    onClickToEdit,
    onKeyUp,
    onBlurHandler,
    nameRef,
  } = useQuizNameEdit(quiz);

  const quizDeleteHandler = () => {
    openDeleteConfirmModal();
  };

  // TODO: add explanation messages when quiz cant be deleted - when its already used in an event - onError handler
  // TODO: prettify modal, add loaders, add notification
  const openDeleteConfirmModal = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: <Text size="sm">Do you really want to delete this quiz?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => deleteQuiz(),
    });

  const onClickHandler = (e: SyntheticEvent) => {
    if (!isEditMode) {
      router.push(`/quiz/${quiz.id}`);
    }
  };

  return (
    // TODO: myb remove link from the component itself to be able to reuse the card in event creation
    // don't redirect when in edit mode
    <Card
      p={0}
      radius="md"
      withBorder
      className={cx(classesCard.card, className)}
      {...others}
      onClick={(e: SyntheticEvent) => {
        if (isEditMode) {
          e.preventDefault();
        }
      }}
    >
      <LoadingOverlay visible={isDeleteLoading} />
      <Card.Section className={classes.imageSection}>
        <Skeleton visible={loading} radius={0} height="100%">
          {!loading && (
            <Image
              onClick={onClickHandler}
              src={quiz.thumbnail}
              withPlaceholder
              // TODO: image into custom component
              placeholder={<ImageSquare size={52} weight="duotone" />}
              alt="thumbnail"
              height="100%"
              fit="cover"
              styles={{
                root: { height: '100%' },
                imageWrapper: { height: '100%' },
                figure: { height: '100%' },
              }}
            />
          )}
        </Skeleton>

        {/* TODO: tooltip */}
        <ThemeIcon variant="filled" className={classes.accessBadge} size="md">
          {quiz.published ? (
            <Globe weight="duotone" />
          ) : (
            <Lock weight="duotone" />
          )}
        </ThemeIcon>
      </Card.Section>

      <Card.Section py={12} px={18}>
        <Group spacing={0} position="apart" align="center" noWrap>
          <Box>
            <FloatingTooltip label="Click to edit">
              <Skeleton visible={loading}>
                <Group
                  position="apart"
                  spacing="sm"
                  sx={() => ({ height: 30 })}
                >
                  {!loading && !isEditMode ? (
                    <Text
                      id="quiz-card-name"
                      weight={500}
                      sx={() => ({ flex: 1 })}
                      className={classes.title}
                      onClick={onClickToEdit}
                      lineClamp={1}
                    >
                      {quiz.name}
                    </Text>
                  ) : (
                    <QuizNameEditInput
                      ref={nameRef}
                      isLoading={isEditLoading}
                      editedName={editedName}
                      onKeyUp={onKeyUp}
                      onBlurHandler={onBlurHandler}
                      setEditedName={setEditedName}
                    />
                  )}
                </Group>
              </Skeleton>
            </FloatingTooltip>
            <Group position="apart" spacing="xs">
              <Group noWrap spacing="xs">
                <Skeleton
                  visible={loading}
                  circle
                  height={20}
                  sx={() => ({ flexShrink: 0 })}
                >
                  {!loading && (
                    <Avatar
                      src={owner.user.image}
                      size={20}
                      radius="xl"
                      mr="xs"
                    />
                  )}
                </Skeleton>

                {/* TODO: divider not working */}
                <Box
                  sx={(t) => ({
                    width: '2px',
                    height: '18px',
                    background: isDark ? t.colors.dark[5] : t.colors.gray[4],
                  })}
                />

                <Skeleton visible={loading}>
                  <Text inline size="xs" color="dimmed" sx={() => ({})}>
                    Updated {relativeTimeTo(quiz.updatedAt)}
                  </Text>
                </Skeleton>
              </Group>
            </Group>
          </Box>
          {!loading && (
            <Menu
              closeOnItemClick
              trigger="click"
              position="top"
              control={
                <ActionIcon variant="hover">
                  <DotsThreeVertical size={24} weight="bold" />
                </ActionIcon>
              }
            >
              <Menu.Item
                icon={<PencilSimpleLine weight="bold" />}
                onClick={onClickToEdit}
              >
                Rename
              </Menu.Item>
              <Menu.Item icon={<LinkSimple weight="bold" />}>
                Copy Link
              </Menu.Item>
              <Menu.Item
                color="red"
                icon={<TrashSimple weight="bold" />}
                onClick={quizDeleteHandler}
              >
                Delete
              </Menu.Item>
            </Menu>
          )}
        </Group>
      </Card.Section>
    </Card>
  );
};

const useStyles = createStyles((theme) => {
  const { isDark } = useAppColorscheme();

  return {
    imageSection: {
      position: 'relative',
      aspectRatio: '16/9',
      width: '100%',
      overflow: 'hidden',
      borderBottom: '1px solid',
      borderColor: isDark ? theme.colors.dark[6] : theme.colors.gray[2],
    },

    accessBadge: {
      position: 'absolute',
      bottom: theme.spacing.xs,
      right: theme.spacing.xs + 2,
      pointerEvents: 'none',
    },

    title: {
      display: 'block',
      cursor: 'default',
    },

    owner: {
      cursor: 'pointer',
    },
  };
});
