import { useMemo } from 'react';
import { useTeams } from './api/teams';

export const useTeamAppliedEvents = () => {
  const { data: teams } = useTeams();

  const teamEvents = useMemo(() => {
    return (
      teams
        ?.map((t) => {
          return t?.eventTeams?.map((ev) => ev.event) ?? [];
        })
        ?.flat() ?? []
    );
  }, [teams]);

  const hasTeamEvents = teamEvents?.length > 0;

  const hasSignedUp = (eventId: string) => {
    return teamEvents.some((ev) => ev.id === eventId);
  };

  return { teamEvents, hasTeamEvents, hasSignedUp };
};
