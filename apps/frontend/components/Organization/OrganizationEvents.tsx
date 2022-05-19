import { Event } from '@prisma/client';

interface Props {
  events: Event[];
  loading: boolean;
}
const OrganizationEvents = ({ events, loading }: Props) => {
  return <div>{events?.length}</div>;
};

export default OrganizationEvents;
