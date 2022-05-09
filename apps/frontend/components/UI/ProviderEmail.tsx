import { Button, Divider, TextInput } from '@mantine/core';

interface Props {
  csrfToken: string;
}

export const ProviderEmail = ({ csrfToken }: Props) => {
  return (
    <form
      method="post"
      action="/api/auth/signin/email"
      style={{ width: '100%' }}
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Divider my="xs" label="or" labelPosition="center" />
      <TextInput
        placeholder="example@domain.com"
        label="Email"
        variant="filled"
        type="email"
        name="email"
        id="email"
        required
      />
      <Button type="submit" mt={12} fullWidth>
        Sign in with Email
      </Button>
    </form>
  );
};
