import { ChangeEvent } from 'react';

interface Props {
  type?: 'image' | 'audio' | 'video';
  selectFile: (file: ChangeEvent<HTMLInputElement>) => void;
}

const fileMap = {
  image: 'image/*',
  audio: 'audio/*',
  video: 'video/*',
};

export const FileUpload = ({ type = 'image', selectFile }: Props) => {
  return (
    <label
      htmlFor="uploadFile"
      className="bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
    >
      <input
        type="file"
        onChange={(e) => selectFile(e)}
        className="hidden"
        id="uploadFile"
        accept={fileMap[type]}
      />
      Select file
    </label>
  );
};
