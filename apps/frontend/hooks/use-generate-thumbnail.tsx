import { useMutation } from 'react-query';
import { createThumbnail, ThumbnailReq } from 'services/api/aws';

export const useGenerateThumbnail = () =>
  useMutation((data: ThumbnailReq) => createThumbnail(data));
