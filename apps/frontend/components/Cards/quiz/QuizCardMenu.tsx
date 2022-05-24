import { ActionIcon, Group, Menu, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
  DotsThreeVertical,
  LinkSimple,
  PencilSimpleLine,
  Play,
  TrashSimple
} from 'phosphor-react';
import { SyntheticEvent } from 'react';

interface Props {
  published: boolean;
  url: string;
  fullUrl: string;
  openDeleteConfirmModal: (e: SyntheticEvent) => void;
  onClickToEdit: (e: SyntheticEvent) => void;
  onGotoQuiz: (e: SyntheticEvent) => void;
}

export const QuizCardMenu = ({
  published,
  url,
  fullUrl,
  openDeleteConfirmModal,
  onClickToEdit,
  onGotoQuiz,
}: Props) => {
  const clipboard = useClipboard();

  return (
    <Menu
      closeOnItemClick
      trigger="click"
      position="top"
      control={
        <Tooltip
          label="Link copied!"
          gutter={5}
          placement="center"
          position="bottom"
          transition="slide-down"
          transitionDuration={200}
          opened={clipboard.copied}
          sx={() => ({ width: '100%' })}
        >
          <ActionIcon variant="hover">
            <DotsThreeVertical size={24} weight="bold" />
          </ActionIcon>
        </Tooltip>
      }
    >
      <Menu.Label>
        <Group>Quiz is {published ? 'published' : 'not published'}</Group>
      </Menu.Label>

      <Menu.Item icon={<Play weight="bold" />} onClick={onGotoQuiz}>
        Go to quiz
      </Menu.Item>

      <Menu.Item
        icon={<LinkSimple weight="bold" />}
        onClick={(e: SyntheticEvent) => clipboard.copy(fullUrl)}
      >
        Copy Link
      </Menu.Item>

      <Menu.Item
        icon={<PencilSimpleLine weight="bold" />}
        onClick={onClickToEdit}
      >
        Rename
      </Menu.Item>

      <Tooltip
        position="bottom"
        label="Quiz is used in an event"
        disabled={!published}
        sx={() => ({ width: '100%' })}
      >
        <Menu.Item
          color="red"
          icon={<TrashSimple weight="bold" />}
          onClick={openDeleteConfirmModal}
          disabled={published}
        >
          Delete
        </Menu.Item>
      </Tooltip>
    </Menu>
  );
};
