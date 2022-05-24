import {
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useAppColorscheme } from 'hooks/colorscheme';
import { useProviders } from 'hooks/providers';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import http from 'services/http';
import { useResendEmail } from 'store/use-resend-email';
import { useInputLabelStyles } from './use-input-styles';

interface Props {
  csrfToken: string;
}

export const ProviderEmail = ({ csrfToken }: Props) => {
  const { providerStyles } = useProviders();
  const { classes } = useInputLabelStyles();
  const { isDark } = useAppColorscheme();
  const router = useRouter();

  const { email, setEmail, saveToCookie } = useResendEmail();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    http.post('/api/auth/signin/email', {
      csrfToken,
      email,
    });
    saveToCookie();
    router.push({
      pathname: '/verify-request',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Divider my="xs" mb="md" label="or" labelPosition="center" />
      <Stack spacing={8}>
        <TextInput
          label="Email"
          placeholder="example@gmail.com"
          variant="filled"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
