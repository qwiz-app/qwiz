import {
  Avatar,
  AvatarsGroup,
  Badge,
  Group,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { DateTimeFormat, formatDate, relativeTimeTo } from 'lib/utils';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

interface Props {
  question: QuestionWithContentAndCategoriesAndMode;
}

export const QuestionTableRow = ({ question }: Props) => {
  const textualContent = question.contents.filter((c) => c.type === 'TEXT');
  const imageContent = question.contents.filter((c) => c.type === 'IMAGE');
  const { categories } = question;
  const hasCategories = categories?.length > 0;

  const categoryLimit = 2;

  return (
    <tr key={question.id}>
      <td>
        <Group spacing="sm" align="baseline">
          {textualContent
            .filter((c) => c.type === 'TEXT')
            .slice(0, 1)
            .map((c) => (
              <Text key={c.id} size="sm" lineClamp={1}>
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
      {/* <td>
          {question.owner ? (
            <Group>
              <Avatar radius="xl" size={32} src={question.owner?.user.image} />
              <Text size="sm">{question.owner?.name}</Text>
            </Group>
          ) : (
            <Group>
              <Avatar radius="xl" size={32} color="blue">
                <GlobeSimple size={24} weight="duotone" />
              </Avatar>
            </Group>
          )}
        </td> */}
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
          label={formatDate(question.updatedAt)}
          position="right"
          withArrow
          gutter={8}
        >
          <Text size="xs" color="dimmed">
            {relativeTimeTo(question.updatedAt)}
          </Text>
        </Tooltip>
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
