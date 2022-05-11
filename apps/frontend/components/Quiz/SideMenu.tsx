import { createStyles, Divider, Paper, Select, Text } from '@mantine/core';
import { questions } from 'mock/questions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const SideMenu = () => {
  const { classes } = useStyles();

  const router = useRouter();
  const { questionId } = router.query;

  const question = questions.find((q) => q.id === questionId);

  useEffect(() => {
    setAnswers(question?.answers);
  }, [question]);

  const [answers, setAnswers] = useState([]);

  return (
    <Paper className={classes.wrapper} shadow="xs" p="md">
      <Text>Edit question #{questionId}</Text>
      <Divider my="sm" />
      <Text my={12}>Acccepted answers</Text>
      {answers && (
        <Select
          data={answers}
          placeholder="Accepted answers"
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => setAnswers((current) => [...current, query])}
        />
      )}
      <Divider my={12} />
      <Text my={12}>Question type</Text>
      <Select
        data={questionTypes}
        placeholder="Select question type"
        searchable
      />
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100%',
  },
}));

const questionTypes = ['Text', 'Audio', 'Image', 'Video'];
