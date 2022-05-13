import {
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useProviders } from 'hooks/providers';
import { useInputLabelStyles } from './use-input-label-styles';

interface Props {
  csrfToken: string;
}

export const ProviderEmail = ({ csrfToken }: Props) => {
  const { providerStyles } = useProviders();
  const { classes } = useInputLabelStyles();
  const { isDark } = useAppColorscheme();

  return (
    <form
      method="post"
      action="/api/auth/signin/email"
      style={{ width: '100%' }}
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Divider my="xs" mb="md" label="or" labelPosition="center" />
      <Stack spacing={8}>
        <TextInput
          label="Email"
          placeholder="example@gmail.com"
          variant="filled"
          type="email"
          name="email"
          id="email"
          size="md"
          required={false}
          classNames={classes}
        />

        <Button
          type="submit"
          variant={isDark ? 'light' : 'filled'}
          size="lg"
          sx={(t) => ({ width: '100%' })}
          styles={{ inner: { justifyContent: 'flex-start' } }}
        >
          <Group spacing={12} position="left">
            {providerStyles.email.icon}
            <Box>
              <Text size="md" weight={500} component="p">
                Sign in with email
              </Text>
            </Box>
          </Group>
        </Button>
      </Stack>
    </form>
  );
};
