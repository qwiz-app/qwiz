import { queryOnError as onError } from 'lib/axios';
import { useQuery } from 'react-query';
import { fetchTopPages, fetchVisitors } from 'services/plausible';

export const useVisitors = (url: string) =>
  useQuery(['visitors', url], () => fetchVisitors(url), {
    onError,
  });

export const useTopPages = () =>
  useQuery(['topPages'], fetchTopPages, {
    onError,
  });
