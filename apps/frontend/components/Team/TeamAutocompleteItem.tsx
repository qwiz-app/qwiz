import { Avatar, AvatarsGroup, Box, Group, Text } from '@mantine/core';
import { UsersThree } from 'phosphor-react';
import { forwardRef } from 'react';
import { TeamFull } from 'types/api/teams';

export type TeamAutocomplete = TeamFull & { value: string };

type ItemProps = TeamFull & { value: string; label: string };

export const TeamAutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, name, createdAt, admin, members, ...others }: ItemProps, ref) => {
    return (
      <Box ref={ref} {...others}>
        <Group noWrap sx={() => ({ width: '100%' })}>
          <Avatar size="md" src={image} alt="thumbnail" sx={() => ({})}>
            <UsersThree size={24} weight="duotone" />
          </Avatar>

          <Box sx={() => ({ width: '100%' })}>
            <Group position="apart" noWrap align="center">
              <Text lineClamp={1}>{name}</Text>
              <AvatarsGroup mt={10} limit={3} size="md">
                {members.map((member) => (
                  <Avatar
                    src={member.user.image}
                    key={member.id}
                    color="orange"
                  />
                ))}
              </AvatarsGroup>
            </Group>
          </Box>
        </Group>
      </Box>
    );
  }
);
