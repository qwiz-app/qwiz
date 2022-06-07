import { Timeline, List, ThemeIcon, Title } from '@mantine/core';
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
    <Timeline
      active={1}
      bulletSize={32}
      lineWidth={3}
      styles={{
        item: { paddingLeft: 32 },
      }}
    >
      {projectTimeline.map((item, i) => (
        <Timeline.Item
          lineVariant="dashed"
          bullet={item.icon}
          title={
            <Title
              sx={(t) => ({ fontFamily: t.fontFamilyMonospace })}
              order={3}
            >
              {item.title}
            </Title>
          }
          key={item.title}
        >
          <List
            spacing="md"
            size="md"
            center
            color="dimmed"
            mt="sm"
            icon={
              <ThemeIcon
                color={i > 1 ? 'gray' : 'orange'}
                size={24}
                radius="xl"
              >
                <CircleWavyCheck size={16} weight="duotone" />
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
    icon: <Lightbulb size={18} weight="duotone" />,
    goals: [
      'Elaboration of problems',
      'Market research',
      'Selection of technologies',
    ],
  },
  {
    title: 'Q2 2022',
    icon: <Code size={18} weight="duotone" />,
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
    icon: <Confetti size={18} weight="duotone" />,
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
    icon: <Globe size={18} weight="duotone" />,
    goals: [
      'Employ people for question database expansion',
      'Start expansion to other countries',
    ],
  },
];
