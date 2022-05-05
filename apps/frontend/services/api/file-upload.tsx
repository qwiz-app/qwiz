import { parseData } from 'lib/axios';
import http from 'services/http';

export type FileUploadReq = {
  name: string;
  type: string;
};

export const generateS3Url = (data: FileUploadReq) =>
  http.post<{ url: string }>('/api/s3/file-upload', data).then(parseData);

export const uploadFileToS3 = (url: string, file: File) =>
  http.put(url, file, {
    headers: {
      'Content-type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  });
