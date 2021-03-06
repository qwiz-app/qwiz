import { Box, Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import Peep from 'assets/peeps/signin/peep-verify.svg';
import AuthLayout from 'components/Layouts/AuthLayout';
import { useBreakpoints } from 'hooks/breakpoints';
import { useAppColorscheme } from 'hooks/colorscheme';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { PaperPlaneRight, SmileySad } from 'phosphor-react';
import { useResendEmail } from 'store/use-resend-email';

const VerifyRequest = () => {
  const { isDark, theme } = useAppColorscheme();
  const { matches } = useBreakpoints();

  const { getFromCookie } = useResendEmail();

  const resendEmailHandler = () => {
    const email = getFromCookie();
    signIn('email', { email, callbackUrl: '/' });
  };

  return (
    <Paper
      sx={(t) => ({
        textAlign: 'center',
        padding: t.spacing.xl,
        borderRadius: t.radius.md,
        transform: 'translateY(-4vh)',
      })}
    >
      <Stack align="center" justify="space-between">
        <Box>
          <Image
            src={Peep}
            objectFit="contain"
            width={500}
            height={500}
            alt="Peep"
          />
          <Stack spacing={12}>
            <Title order={matches.max.sm ? 3 : 2}>
              <Group position="center">Check your email</Group>
            </Title>
            <Text color="gray" mb={12}>
              A sign-in link has been sent to your email address.
            </Text>
          </Stack>
        </Box>
        <Stack mt={32} align="center">
          <Text
            sx={(t) => ({
              color: t.colors.orange[isDark ? 4 : 6],
              transform: 'translateX(-2px)',
            })}
          >
            <Group position="center" spacing={4}>
              <SmileySad
                size={22}
                color={theme.colors.orange[isDark ? 4 : 6]}
                weight="duotone"
              />
              Don&apos;t see our email yet?
            </Group>
          </Text>
          <Button size="md" variant="light" onClick={resendEmailHandler}>
            <Group spacing={8}>
              Resend email
              <PaperPlaneRight weight="duotone" />
            </Group>
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

VerifyRequest.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default VerifyRequest;
