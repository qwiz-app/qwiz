import { parseData } from 'lib/axios';
import http from 'services/http';

export type FileUploadReq = {
  name: string;
  type: string;
};

export const generateS3Url = (data: FileUploadReq) =>
  http.post<{ url: string }>('/api/aws/upload', data).then(parseData);

export const uploadFileToS3 = (url: string, file: File) =>
  http.put(url, file, {
    headers: {
      'Content-type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  });

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
    .post<{ url: string }>(`/api/aws/thumbnail`, {
      url,
      size,
    })
    .then(parseData);

export const createPdf = ({
  url,
}: { url: string}) =>
  http
    .post<{ url: string }>(`/api/aws/pdf`, {
      url,
    })
    .then(parseData);