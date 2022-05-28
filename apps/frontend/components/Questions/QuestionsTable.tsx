import {
  Avatar,
  AvatarsGroup,
  Badge,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { formatDate, relativeTimeTo } from 'lib/utils';
import { MagnifyingGlass } from 'phosphor-react';
import { useEffect } from 'react';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

interface Props {
  questions: QuestionWithContentAndCategoriesAndMode[];
}

export const QuestionsTable = ({ questions }: Props) => {
  const { isDark } = useAppColorscheme();

  const ths = (
    <tr>
      <th>Textual</th>
      <th>Visual</th>
      <th>Scope</th>
      {/* <th>Owner</th> */}
      <th>Categories</th>
      <th>Last edited</th>
      <th>Availability</th>
    </tr>
  );

  useEffect(() => {
    console.log('QuestionsTable: useEffect', questions);
  }, [questions]);

  const rows = questions?.map((element) => {
    const textualContent = element.contents.filter((c) => c.type === 'TEXT');
    const imageContent = element.contents.filter((c) => c.type === 'IMAGE');
    const { categories } = element;
    const hasCategories = categories?.length > 0;
    // const hasImageContent = imageContent?.length > 0;

    const categoryLimit = 2;

    return (
      <tr key={element.id}>
        <td>
          <Group spacing="sm">
            {textualContent
              .filter((c) => c.type === 'TEXT')
              .slice(0, 1)
              .map((c) => (
                <Text key={c.id} lineClamp={1}>
                  {c.content}
                </Text>
              ))}
            {textualContent?.length > 1 && (
              <Text weight={500} size="xs" color="dimmed">
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
            {element.isGlobal ? (
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
          {element.owner ? (
            <Group>
              <Avatar radius="xl" size={32} src={element.owner?.user.image} />
              <Text size="sm">{element.owner?.name}</Text>
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
                  variant={isDark ? 'light' : 'outline'}
                  color={elem.color}
                  size="sm"
                  key={elem.id}
                  radius="xl"
                >
                  {elem.name}
                </Badge>
              ))}
              {categories?.length > categoryLimit && (
                <Text ml={4} weight={500} size="xs" color="dimmed">
                  + {categories.length - 1}
                </Text>
              )}
            </Group>
          ) : null}
        </td>
        <td>
          <Tooltip
            label={formatDate(element.updatedAt)}
            position="right"
            withArrow
            gutter={8}
          >
            <Text size="xs" color="dimmed">
              {relativeTimeTo(element.updatedAt)}
            </Text>
          </Tooltip>
        </td>
        <td>
          <Stack align="start">
            {element.isActive ? (
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
  });

  return (
    <ScrollArea
      sx={() => ({
        width: '100%',
      })}
    >
      <TextInput
        placeholder="Search by any field"
        mb="md"
        size="md"
        icon={<MagnifyingGlass size={14} />}
      />
      <Table fontSize="md" highlightOnHover>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
