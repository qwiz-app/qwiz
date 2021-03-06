import { onError } from 'lib/axios';
import { useQuery } from 'react-query';
import {
  fetchOrganization,
  fetchOrganizations,
  fetchCurrentOrganization,
} from 'services/api/organizations';

export const useOrganizations = () =>
  useQuery(['organizations'], fetchOrganizations, {
    onError,
  });

export const useOrganization = (id: string) =>
  useQuery(
    ['organization', id],
    ({ queryKey }) => fetchOrganization(queryKey[1]),
    {
      onError,
      enabled: !!id,
    }
  );

export const useCurrentOrganizationInfo = (isOrg = true) =>
  useQuery(['currentOrganization'], fetchCurrentOrganization, {
    onError,
    enabled: isOrg,
  });
