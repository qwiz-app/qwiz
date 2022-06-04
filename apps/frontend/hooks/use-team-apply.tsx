import { EventApplyModal } from 'components/Event/EventApplyModal';
import { useState } from 'react';
import { useEventTeamCreate, useTeams } from './api/teams';
import { useCurrentUser } from './api/users';

export const useTeamApply = (eventId: string) => {
  const [opened, setOpened] = useState(false);
  const { isUser } = useCurrentUser();

  const { data: teams } = useTeams(isUser && opened);

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
