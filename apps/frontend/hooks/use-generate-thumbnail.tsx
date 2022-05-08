import { useMutation } from 'react-query';
import { createThumbnail, ThumbnailReq } from 'services/aws';

export const useGenerateThumbnail = () =>
  useMutation((data: ThumbnailReq) => createThumbnail(data));
