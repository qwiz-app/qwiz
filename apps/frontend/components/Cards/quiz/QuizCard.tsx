import {
  Avatar,
  Box,
  Card,
  createStyles,
  FloatingTooltip,
  Group,
  Image,
  LoadingOverlay,
  Skeleton,
  Text,
  ThemeIcon
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { useQuizDelete, useQuizNameEdit } from 'hooks/api/quiz';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useDeleteConfirmModal } from 'hooks/use-delete-confirm-modal';
import { relativeTimeTo } from 'lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { paths } from 'paths';
import { Globe, ImageSquare, Lock } from 'phosphor-react';
import React, { SyntheticEvent } from 'react';
import { QuizWithSlides } from 'types/api/quiz';
import { useCardStyles } from '../use-card-styles';
import { QuizCardMenu } from './QuizCardMenu';
import QuizNameEditInput from './QuizNameEditInput';
import { useQuizSlideRoute } from './use-quiz-slide-route';

interface QuizCardProps {
  quiz: QuizWithSlides;
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

  const { showNotification } = useNotifications();
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
  const { url, fullUrl } = useQuizSlideRoute(quiz);

  const openDeleteConfirmModal = useDeleteConfirmModal({
    onConfirm: () => {
      deleteQuiz();
      showNotification({
        title: 'Quiz deleted',
        message: 'Quiz has successfully been deleted',
        color: 'green',
      });
    },
    deletedEntity: 'quiz',
  });

  const onClickHandler = (e: SyntheticEvent) => {
    if (!isEditMode) {
      router.push(url);
    }
  };

  // eslint-disable-next-line no-underscore-dangle
  const isPublished = quiz?._count?.event > 0 ?? false;

  return (
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
        <Box className={classes.accessBadge}>
          <ThemeIcon variant="filled" size="md">
            {isPublished ? (
              <Globe weight="duotone" />
            ) : (
              <Lock weight="duotone" />
            )}
          </ThemeIcon>
        </Box>
      </Card.Section>

      <Card.Section py={12} px={18}>
        <Group spacing={0} position="apart" align="center" noWrap>
          <Box>
            <FloatingTooltip
              label="Click to edit"
              disabled={isEditMode || isEditLoading}
            >
              <Skeleton visible={loading}>
                <Group
                  position="apart"
                  spacing="sm"
                  sx={() => ({ height: 30 })}
                >
                  {!loading && !isEditMode ? (
                    <Text
                      id="quiz-name"
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
                    <Link
                      href={paths.organizationPage(owner.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Avatar
                        src={owner.user.image}
                        size={20}
                        radius="xl"
                        mr="xs"
                      />
                    </Link>
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
            <QuizCardMenu
              url={url}
              fullUrl={fullUrl}
              published={isPublished}
              openDeleteConfirmModal={openDeleteConfirmModal}
              onClickToEdit={onClickToEdit}
              onGotoQuiz={onClickHandler}
            />
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
      cursor: 'pointer',
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
