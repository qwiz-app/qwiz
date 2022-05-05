import axios from 'axios';
import config from 'lib/config';
import { useState } from 'react';
import sha1 from 'sha1';

export enum UploadStatusEnum {
  NOT_STARTED = 'NOT_STARTED',
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
}

export const useFileUpload = () => {
  const [file, setFile] = useState<File>();
  const [uploadingStatus, setUploadingStatus] = useState<UploadStatusEnum>(
    UploadStatusEnum.NOT_STARTED
  );
  const [uploadedFile, setUploadedFile] = useState<string>(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingStatus(UploadStatusEnum.UPLOADING);

    const salt = new Date().getTime();

    const hashedFile = sha1(file.name + salt);

    const { data } = await axios.post('/api/s3/uploadFile', {
      name: hashedFile,
      type: file.type,
    });

    const { url } = data;
    await axios.put(url, file, {
      headers: {
        'Content-type': file.type,
        'Access-Control-Allow-Origin': '*',
      },
    });

    setUploadingStatus(UploadStatusEnum.UPLOADED);

    setUploadedFile(config.aws.bucketUrl + hashedFile);
    setFile(null);
  };

  return {
    selectFile,
    uploadFile,
    uploadingStatus,
    uploadedFile,
    file,
  };
};
