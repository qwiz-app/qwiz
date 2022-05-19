/* eslint-disable no-nested-ternary */
import { ComponentProps, useRef } from 'react';
import {
  Group,
  Text,
  MantineTheme,
  Card,
  createStyles,
  Box,
  FloatingTooltip,
} from '@mantine/core';
import {
  Upload,
  Image as ImageIcon,
  X,
  Icon as PhosporIcon,
} from 'phosphor-react';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { useAppColorscheme } from 'hooks/colorscheme';
import { showNotification } from '@mantine/notifications';
import cn from 'classnames';

export interface FileUploadProps {
  type?: 'image' | 'audio' | 'video';
  url: string;
  uploadFile: (selectedFile: File) => void;
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
  url,
  uploadFile,
  loading = false,
  //! in megabytes
  maxSize = 8,
}: FileUploadProps) => {
  const { theme } = useAppColorscheme();
  const openRef = useRef<() => void>();

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {url && <ImageCard image={url} openDropzone={() => openRef.current()} />}
      <Dropzone
        onDrop={(file) => uploadFile(file[0])}
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
        openRef={openRef}
        // TODO: windi
        className={cn([url && 'hidden'])}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
    </Box>
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
        Attach as many files as you like, each file should not exceed 8mb
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

  return <ImageIcon {...props} />;
};

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image');

  return {
    card: {
      position: 'relative',
      height: 280,
      width: '100%',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: 'scale(1.03)',
      },
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      transition: 'transform 500ms ease',
      backgroundPosition: 'center center',
    },

    overlay: {
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },
  };
});

interface ImageCardProps {
  image: string;
  openDropzone: () => void;
}

const ImageCard = ({ image, openDropzone }: ImageCardProps) => {
  const { classes } = useStyles();

  return (
    <FloatingTooltip label="Click to replace image" sx={{ width: '100%' }}>
      <Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        onClick={openDropzone}
      >
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={classes.overlay} />
      </Card>
    </FloatingTooltip>
  );
};
