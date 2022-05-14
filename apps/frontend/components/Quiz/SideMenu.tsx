import {
  Accordion,
  ColorPicker,
  createStyles,
  Divider,
  Paper,
  Select,
  Tabs,
  Text,
} from '@mantine/core';
import { useBackgroundColor } from 'hooks/use-background-color';
import { questions } from 'mock/questions';
import { useRouter } from 'next/router';
import { FadersHorizontal, PaintRoller } from 'phosphor-react';
import { useEffect, useState } from 'react';


export const SideMenu = () => {
  const { classes } = useStyles();
  const { backgroundColor, setBackgroundColor } = useBackgroundColor();

  const router = useRouter();
  const { questionId } = router.query;

  const question = questions.find((q) => q.id === questionId);

  useEffect(() => {
    setAnswers(question?.answers);
  }, [question]);

  const [answers, setAnswers] = useState([]);

  return (
    <Paper className={classes.wrapper} shadow="xs">
      <Tabs variant="outline" p="md">
        <Tabs.Tab label="Settings" icon={<FadersHorizontal size={32} />}>
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
        </Tabs.Tab>
        <Tabs.Tab label="Design" icon={<PaintRoller size={32} />}>
          <Accordion>
            <Accordion.Item label="Background">
              <ColorPicker
                format="hex"
                value={backgroundColor}
                onChange={setBackgroundColor}
                fullWidth
              />
            </Accordion.Item>
          </Accordion>
        </Tabs.Tab>
      </Tabs>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100%',
  },
}));

const questionTypes = ['Text', 'Audio', 'Image', 'Video'];
