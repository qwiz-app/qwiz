import { Box, Button, Text } from '@mantine/core';
import AuthLayout from 'components/Layouts/AuthLayout';

const VerifyRequest = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
      })}
    >
      <h1>Check your email</h1>
      <Text color="gray" mb={12}>
        A sign in link has been sent to your email address.
      </Text>
      <Text color="blue" mb={6}>
        Don&apos;t see the email yet?
      </Text>
      <Button>Resend verification email</Button>
    </Box>
  );
};

VerifyRequest.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default VerifyRequest;
