import { EventApplyModal } from 'components/Event/EventApplyModal';
import { useState } from 'react';
import { useEventTeamCreate, useTeams } from './api/teams';

export const useTeamApply = (eventId: string) => {
  const [opened, setOpened] = useState(false);

  const { data: teams } = useTeams(opened);

  const teamOptions = teams?.map((team) => ({
    ...team,
    value: team.id,
  }));

  const { mutate: reserveEvent, isLoading: isReserveLoading } =
    useEventTeamCreate(eventId);

  const openModal = () => setOpened(true);
  const closeModal = () => setOpened(false);

  const onReserveHandler = (selectedTeam) => {
    reserveEvent(
      { teamId: selectedTeam?.id },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  const TeamApplyModal = (
    <EventApplyModal
      teams={teamOptions}
      opened={opened}
      onClose={closeModal}
      onReserve={onReserveHandler}
      loading={isReserveLoading}
    />
  );

  return {
    opened,
    openModal,
    closeModal,
    teamOptions,
    reserveEvent,
    isReserveLoading,
    TeamApplyModal,
  };
};
