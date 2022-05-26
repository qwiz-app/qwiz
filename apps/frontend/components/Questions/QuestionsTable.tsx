import {
  Avatar,
  Badge,
  ScrollArea,
  Stack,
  Table,
  TextInput,
} from '@mantine/core';
import { MagnifyingGlass } from 'phosphor-react';
import { useEffect } from 'react';
import { QuestionWithContentAndCategoriesAndMode } from 'types/api/question';

interface Props {
  questions: QuestionWithContentAndCategoriesAndMode[];
}

export const QuestionsTable = ({ questions }: Props) => {
  const ths = (
    <tr>
      <th>Owner</th>
      <th>Question</th>
      <th>Scope</th>
      <th>State</th>
    </tr>
  );

  useEffect(() => {
    console.log('QuestionsTable: useEffect', questions);
  }, [questions]);

  const rows = questions?.map((element) => (
    <tr key={element.id}>
      <td>
        <Avatar radius="xl" size={24} src={element.owner?.user.image} />
      </td>
      <td>{element.contents[0].content}</td>
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
      <td>
        <Stack align="start">
          {element.isActive ? (
            <Badge color="green" variant="filled" size="sm">
              Active
            </Badge>
          ) : (
            <Badge color="red" variant="filled" size="sm">
              Inactive
            </Badge>
          )}
        </Stack>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<MagnifyingGlass size={14} />}
      />
      <Table fontSize="md" highlightOnHover striped captionSide="bottom">
        <caption>All for your custom questions</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
        <tfoot>{ths}</tfoot>
      </Table>
    </ScrollArea>
  );
};
