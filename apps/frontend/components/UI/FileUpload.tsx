/* eslint-disable no-nested-ternary */
import { ComponentProps } from 'react';
import { Group, Text, MantineTheme } from '@mantine/core';
import { Upload, Image, X, Icon as PhosporIcon } from 'phosphor-react';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { useAppColorscheme } from 'hooks/colorscheme';
import { showNotification } from '@mantine/notifications';

interface Props {
  type?: 'image' | 'audio' | 'video';
  selectFile: (seletedFile: File) => void;
  loading?: boolean;
  maxSize?: number;
}

const fileMap = {
  image: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'image/webp',
  ],
  audio: ['audio/mpeg', 'audio/mp3', 'audio/ogg'],
  video: ['video/mp4', 'video/ogg', 'video/webm'],
};

export const FileUpload = ({
  type = 'image',
  selectFile,
  loading = false,
  //! in megabytes
  maxSize = 8,
}: Props) => {
  const { theme } = useAppColorscheme();

  return (
    <Dropzone
      onDrop={(file) => selectFile(file[0])}
      onReject={() =>
        showNotification({
          title: 'File upload failed',
          message: 'The provided file is too big',
          color: 'red',
        })
      }
      maxSize={maxSize * 1024 ** 2}
      accept={fileMap[type]}
      multiple={false}
      loading={loading}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
};

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: 'none' }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

const getIconColor = (status: DropzoneStatus, theme: MantineTheme) => {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
};

const ImageUploadIcon = ({
  status,
  ...props
}: ComponentProps<PhosporIcon> & { status: DropzoneStatus }) => {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
};
