import { Avatar as MantineAvatar } from '@mantine/core';
import BoringAvatar from 'boring-avatars';

interface Props {
  avatar: string | null;
  name: string;
  size: number;
  radius?: 'lg' | 'md' | 'xl' | 'xs';
}

export const Avatar = ({ avatar, name, size, radius = 'md' }: Props) => {
  if (avatar) {
    return <MantineAvatar src={avatar} size={size} radius={radius} />;
  }

  return <BoringAvatar size={size} name={name} variant="marble" />;
};
