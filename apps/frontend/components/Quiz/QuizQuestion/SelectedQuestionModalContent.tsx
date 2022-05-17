import {
  Badge,
  Box,
  createStyles,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { QuestionElementType } from '@prisma/client';
import React from 'react';
import { QuestionWithContentAndOwnerAndCategoriesAndMode } from 'types/question';

interface Props {
  question: QuestionWithContentAndOwnerAndCategoriesAndMode;
}

export const SelectedQuestionModalContent = ({ question }: Props) => {
  const textElements = question.contents.filter(
    ({ type }) => type === QuestionElementType.TEXT
  );
  const imageElements = question.contents.filter(
    ({ type }) => type === QuestionElementType.IMAGE
  );

  const hasTextElements = textElements?.length > 0;
  const hasImageElements = imageElements?.length > 0;

  const { classes } = useStyles();

  return (
    <Box>
     
      {hasImageElements && (
        <Paper withBorder p="md" radius="md">
          <Badge size="md">Images</Badge>
          <Stack  align="start">
            <SimpleGrid cols={2}>
              {imageElements.map((elem) => (
                <Paper
                  key={elem.id}
                  radius="sm"
                  sx={() => ({ overflow: 'hidden' })}
                >
                  <Image src={elem.content} alt="question image" />
                </Paper>
              ))}
            </SimpleGrid>
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  sectionWrapper: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: '-25%',
    left: '10px',
  },
}));
