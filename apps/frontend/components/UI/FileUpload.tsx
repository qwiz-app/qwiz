import { Button } from '@mantine/core';
import { useFileUpload } from 'hooks/use-flle-upload';
import { useEffect } from 'react';

export const FileUpload = ({ setUrl }) => {
  const { selectFile, uploadFile, uploadingStatus, uploadedFile, file } =
    useFileUpload();

  useEffect(() => {
    if (uploadingStatus === 'UPLOADED') {
      setUrl(uploadedFile);
    }
  }, [uploadedFile]);

  return (
    <>
      <label
        htmlFor="uploadFile"
        className="bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
      >
        <input
          type="file"
          onChange={(e) => selectFile(e)}
          className="hidden"
          id="uploadFile"
        />
        Select file
      </label>
      {file && (
        <>
          <p>Selected file: {file.name}</p>
          <Button
            onClick={uploadFile}
            className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
          >
            Upload a File!
          </Button>
        </>
      )}
      {uploadingStatus && <p>{uploadingStatus}</p>}
    </>
  );
};