import { Timeline, List, ThemeIcon } from '@mantine/core';
import {
  CircleWavyCheck,
  Code,
  Confetti,
  Globe,
  Lightbulb,
} from 'phosphor-react';
import { ReactNode } from 'react';

export const AppTimeline = () => {
  return (
    <Timeline active={1} bulletSize={24} lineWidth={2} color="indigo">
      {projectTimeline.map((item, i) => (
        <Timeline.Item bullet={item.icon} title={item.title} key={item.title}>
          <List
            spacing="xs"
            size="sm"
            center
            color="dimmed"
            mt="sm"
            icon={
              <ThemeIcon
                color={i > 1 ? 'dark' : 'indigo'}
                size={16}
                radius="xl"
              >
                <CircleWavyCheck size={12} />
              </ThemeIcon>
            }
          >
            {item.goals.map((goal, index) => (
              <List.Item key={index}>{goal}</List.Item>
            ))}
          </List>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

interface ProjectTimelineItem {
  title: string;
  icon: ReactNode;
  goals: string[];
}

const projectTimeline: ProjectTimelineItem[] = [
  {
    title: 'Q1 2022',
    icon: <Lightbulb size={12} />,
    goals: [
      'Elaboration of problems',
      'Market research',
      'Selection of technologies',
    ],
  },
  {
    title: 'Q2 2022',
    icon: <Code size={12} />,
    goals: [
      'Finished initial app design',
      'Bootstrapped frontend, backend and database',
      'Created staging and production environments',
      'Added quiz, question and event creation',
      'Implemented user registration for events',
      'Released MVP version of the application',
    ],
  },
  {
    title: 'Q3 2022',
    icon: <Confetti size={12} />,
    goals: [
      'Live playing mode for quizzes',
      'Question packs for organizers',
      'Statistics',
      'Leaderboards',
      'Question localization',
    ],
  },
  {
    title: 'Q4 2022',
    icon: <Globe size={12} />,
    goals: [
      'Employ people for question database expansion',
      'Start expansion to other countries',
    ],
  },
];
