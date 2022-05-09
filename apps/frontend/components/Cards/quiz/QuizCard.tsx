import {
  ActionIcon,
  Avatar,
  Box,
  Card, createStyles,
  FloatingTooltip,
  Group,
  Image, Skeleton,
  Text, ThemeIcon
} from '@mantine/core';
import { useQuizNameEdit } from 'hooks/api/quiz/use-quiz-name-edit';
import { useAppColorscheme } from 'hooks/colorscheme';
import { relativeTimeTo } from 'lib/utils';
import {
  Bookmark,
  DotsThree,
  Globe,
  Heart,
  ImageSquare,
  Lock,
  Share
} from 'phosphor-react';
import React, { SyntheticEvent } from 'react';
import { QuizWithOrganization } from 'types/organization';
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
  const { isDark } = useAppColorscheme();

  const { owner } = quiz;
  const {
    editedName,
    setEditedName,
    isEditMode,
    isLoading,
    onClickToEdit,
    onKeyUp,
    onBlurHandler,
    nameRef,
  } = useQuizNameEdit(quiz);

  return (
    // TODO: myb remove link from the component itself to be able to reuse the card in event creation
    // don't redirect when in edit mode
    <Card
      p={0}
      radius="md"
      withBorder
      className={cx(classes.card, className)}
      {...others}
      onClick={(e: SyntheticEvent) => {
        if (isEditMode) {
          e.preventDefault();
        }
      }}
    >
      <Card.Section className={classes.imageSection}>
        <Skeleton visible={loading} radius={0} height="100%">
          {!loading && (
            <Image
              onClick={onClickToEdit}
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
        <Skeleton visible={loading} sx={() => ({ overflow: 'visible' })}>
          <Group position="apart" spacing="sm" sx={() => ({ height: 30 })}>
            {!loading && !isEditMode ? (
              <FloatingTooltip label="Click to edit">
                <Text
                  weight={500}
                  sx={() => ({ flex: 1 })}
                  className={classes.title}
                  onClick={onClickToEdit}
                >
                  {quiz.name}
                </Text>
              </FloatingTooltip>
            ) : (
              <QuizNameEditInput
                isLoading={isLoading}
                ref={nameRef}
                editedName={editedName}
                onKeyUp={onKeyUp}
                onBlurHandler={onBlurHandler}
                setEditedName={setEditedName}
              />
            )}
            <ActionIcon variant="hover">
              <DotsThree size={16} weight="duotone" />
            </ActionIcon>
          </Group>
        </Skeleton>

        <Group position="apart" spacing="xs" mt={6}>
          <Group noWrap spacing="xs">
            <Skeleton
              visible={loading}
              circle
              height={20}
              sx={() => ({ flexShrink: 0 })}
            >
              {!loading && (
                <Avatar src={owner.user.image} size={20} radius="xl" mr="xs" />
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

            <Skeleton
              visible={loading}
              sx={() => ({ overflow: loading ? 'hidden' : 'visible' })}
            >
              <Text inline size="xs" color="dimmed" sx={() => ({})}>
                Updated {relativeTimeTo(quiz.updatedAt)}
              </Text>
            </Skeleton>
          </Group>

          <Group spacing={8} mr={0}>
            <ActionIcon
              className={classes.icon1}
              variant="hover"
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
              }}
            >
              <Heart size={16} weight="duotone" />
            </ActionIcon>
            <ActionIcon
              className={classes.icon2}
              variant="hover"
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
              }}
            >
              <Bookmark size={16} weight="duotone" />
            </ActionIcon>
            <ActionIcon
              className={classes.icon3}
              variant="hover"
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
              }}
            >
              <Share size={16} weight="duotone" />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

const useStyles = createStyles((theme) => {
  const { isDark } = useAppColorscheme();

  return {
    card: {
      position: 'relative',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 250ms',

      '&:hover': {
        borderColor: 'transparent',
        boxShadow: theme.shadows.xl,
      },
    },

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

    icon1: {
      '&:hover': {
        color: theme.colors.red[5],
      },
    },

    icon2: {
      '&:hover': {
        color: theme.colors.orange[5],
      },
    },

    icon3: {
      '&:hover': {
        color: theme.colors.blue[5],
      },
    },
  };
});
