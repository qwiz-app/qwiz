import { parseData } from 'lib/axios';
import http from 'services/http';

export interface ThumbnailReq {
  url: string;
  size?: {
    width: number;
    height: number;
  };
}

export const createThumbnail = ({
  url,
  size = {
    width: 1280,
    height: 720,
  },
}: ThumbnailReq) =>
  http
    .post<{ url: string }>(`/api/quiz/thumbnail`, {
      url,
      size,
    })
    .then(parseData);
