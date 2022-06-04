import { Autocomplete, Button, Group, Modal, Stack } from '@mantine/core';
import {
  TeamAutocomplete,
  TeamAutoCompleteItem
} from 'components/Team/TeamAutocompleteItem';
import { useModalProps } from 'context/mantine';
import { Checks, UsersThree } from 'phosphor-react';
import { useState } from 'react';

interface Props {
  opened: boolean;
  onClose: () => void;
  onReserve: (team: TeamAutocomplete) => void;
  teams: TeamAutocomplete[];
  loading: boolean;
}

export const EventApplyModal = ({
  opened,
  onClose,
  teams,
  onReserve,
  loading,
}: Props) => {
  const { modalProps } = useModalProps();

  const [selectedTeam, setSelectedTeam] = useState<TeamAutocomplete | null>(
    null
  );

  const selectedTeamHandler = (teamId: string) => {
    const chosen = teams?.find((team) => team.id === teamId) ?? null;
    setSelectedTeam(chosen);
  };

  const closeHandler = () => {
    setSelectedTeam(null);
    onClose();
  };

  const onReserveHandler = () => {
    onReserve(selectedTeam);
  };

  return (
    <Modal
      {...modalProps}
      opened={opened}
      onClose={closeHandler}
      title="Event reservation"
    >
      <Stack>
        <Autocomplete
          icon={<UsersThree size={24} weight="duotone" />}
          size="md"
          label="Pick your team"
          placeholder="Pick one"
          itemComponent={TeamAutoCompleteItem}
          value={selectedTeam?.name}
          onChange={selectedTeamHandler}
          data={teams}
          filter={(value, item) =>
            item?.name.toLowerCase().includes(value.toLowerCase().trim())
          }
        />
        <Group position="right">
          <Button
            size="md"
            rightIcon={<Checks weight="duotone" />}
            disabled={!selectedTeam}
            onClick={onReserveHandler}
            loading={loading}
          >
            Reserve your place
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
