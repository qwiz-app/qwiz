import config from 'lib/config';
import { useState } from 'react';
import { generateS3Url, uploadFileToS3 } from 'services/api/aws';
import sha1 from 'sha1';

export enum UploadStatusEnum {
  NOT_STARTED = 'NOT_STARTED',
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
}

export const useFileUpload = () => {
  const [uploadingStatus, setUploadingStatus] = useState<UploadStatusEnum>(
    UploadStatusEnum.NOT_STARTED
  );
  const [uploadedFile, setUploadedFile] = useState<string>(null);

  const uploadFile = async (file: File) => {
    setUploadingStatus(UploadStatusEnum.UPLOADING);

    const salt = new Date().getTime();

    const hashedFile = sha1(file.name + salt);

    const { url } = await generateS3Url({
      name: hashedFile,
      type: file.type,
    });

    await uploadFileToS3(url, file);

    setUploadingStatus(UploadStatusEnum.UPLOADED);

    setUploadedFile(config.aws.bucketUrl + hashedFile);
  };

  return {
    uploadFile,
    uploadingStatus,
    url: uploadedFile,
  };
};
