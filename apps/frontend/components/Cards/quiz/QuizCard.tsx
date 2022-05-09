import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  createStyles,
  FloatingTooltip,
  Group,
  Image, Loader,
  Skeleton,
  Text,
  TextInput,
  ThemeIcon
} from '@mantine/core';
import { useQuizUpdate } from 'hooks/api/quiz';
import { useAppColorscheme } from 'hooks/colorscheme';
import { relativeTimeTo } from 'lib/utils';
import { useRouter } from 'next/router';
import {
  Bookmark,
  DotsThree,
  Globe,
  Heart,
  ImageSquare,
  Lock,
  Share
} from 'phosphor-react';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { setTimeout } from 'timers';
import { QuizWithOrganization } from 'types/organization';

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
  const { mutate, isLoading: isNameUpdateLoading } = useQuizUpdate(quiz.id);

  const [isQuizNameEditMode, setIsQuizNameEditMode] = useState(false);
  const [editedQuizName, setEditedQuizName] = useState(quiz.name);
  const DEFAULT_QUIZ_NAME = 'Untitled';

  const quizNameRef = useRef<HTMLInputElement>();
  const { owner } = quiz;

  useEffect(() => {
    // reset quiz name when exited the mode
    if (!isQuizNameEditMode) {
      setEditedQuizName(quiz.name);
    }
  }, [isQuizNameEditMode]);

  const updateQuizNameHandler = () => {
    if (editedQuizName.trim() === quiz.name) {
      setIsQuizNameEditMode(false);
      return;
    }
    if (editedQuizName.trim() === '') {
      setEditedQuizName(DEFAULT_QUIZ_NAME);
    }

    mutate(
      { name: editedQuizName.trim() || null },
      {
        onSettled: (_, _2, variables) => {
          setIsQuizNameEditMode(false);
        },
      }
    );
  };

  const onClickToEditName = (e: SyntheticEvent) => {
    setEditedQuizName(quiz.name);
    e.stopPropagation();
    setIsQuizNameEditMode(true);
    setTimeout(() => {
      quizNameRef.current?.focus();
      quizNameRef.current?.select();
    }, 0);
  };

  // TODO: typescript events ugh
  const onEnterQuizName = (e: any) => {
    if (e.key === 'Enter') {
      updateQuizNameHandler();
    } else if (e.key === 'Escape') {
      setEditedQuizName(quiz.name);
      setIsQuizNameEditMode(false);
    }
  };

  const onQuizNameBlurHandler = (e: SyntheticEvent) => {
    setTimeout(() => {
      updateQuizNameHandler();
    }, 0);
  };

  const router = useRouter();

  const onClickHandler = (e: SyntheticEvent) => {
    console.log('onClickHandler');

    if (!isQuizNameEditMode && editedQuizName === quiz.name) {
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
      className={cx(classes.card, className)}
      {...others}
      onClick={(e: SyntheticEvent) => {
        if (isQuizNameEditMode) {
          e.preventDefault();
        }
      }}
    >
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
        <Skeleton visible={loading} sx={() => ({ overflow: 'visible' })}>
          <Group position="apart" spacing="sm" sx={() => ({ height: 30 })}>
            {!loading && !isQuizNameEditMode ? (
              <FloatingTooltip label="Click to edit">
                <Text
                  weight={500}
                  sx={() => ({ flex: 1 })}
                  className={classes.title}
                  onClick={onClickToEditName}
                >
                  {quiz.name}
                </Text>
              </FloatingTooltip>
            ) : (
              <TextInput
                ref={quizNameRef}
                variant="filled"
                size="xs"
                sx={() => ({ flex: 1 })}
                styles={{
                  input: {
                    fontSize: 16,
                    fontWeight: 500,
                  },
                }}
                rightSection={isNameUpdateLoading ? <Loader size="sm" /> : null}
                value={editedQuizName}
                onChange={(e) => setEditedQuizName(e.target.value)}
                onClick={(e: SyntheticEvent) => e.stopPropagation()}
                onKeyUp={onEnterQuizName}
                onBlur={onQuizNameBlurHandler}
                disabled={isNameUpdateLoading}
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

            <Skeleton visible={loading} sx={() => ({ overflow: 'visible' })}>
              <Text inline size="xs" color="dimmed" sx={() => ({})}>
                Updated {relativeTimeTo(quiz.createdAt)}
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
