/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import {
    Avatar,
    createStyles,
    Group,
    Paper,
    Skeleton,
    Stack,
    Title
} from '@mantine/core';
import { OrganizationWithUser } from 'types/organization';

interface Props {
  organization: OrganizationWithUser;
  loading: boolean;
}

export const OrganizationHeader = ({ organization, loading }: Props) => {
  const { classes } = useStyles();

  return (
    <Skeleton visible={loading} radius="md">
      {organization && !loading && (
        <Paper
          radius="md"
          py={72}
          sx={(t) => ({
            overflow: 'hidden',
          })}
        >
          <Group
            py={16}
            pr={32}
            pl={64}
            spacing={72}
            sx={() => ({
              top: 0,
              left: 50,
            })}
            align="center"
            noWrap
          >
            <Avatar
              src={organization.user.image}
              size={164}
              className={classes.avatar}
            />
            <Stack
              spacing={24}
              sx={() => ({
                width: '100%',
              })}
            >
              <Title order={2} className={classes.orgName}>
                {organization.name}
              </Title>
            </Stack>
          </Group>
        </Paper>
      )}
    </Skeleton>
  );
};

const useStyles = createStyles((t) => {
  return {
    avatar: {
      boxShadow: t.shadows.xl,
      borderRadius: '100rem',
      cursor: 'pointer',
    },

    orgName: {
      cursor: 'pointer',
      fontWeight: 500,
    },

    eventName: {
      lineHeight: '1.2',
      fontWeight: 700,
    },
  };
});
