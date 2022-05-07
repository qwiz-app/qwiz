import { Box, Button, Group, Text } from '@mantine/core';
import { ProviderId, useProviders } from 'hooks/providers';

interface Props {
  id: ProviderId;
  name: string;
  onClick: (id: ProviderId) => void;
}

const ProviderButton = ({ id, name, onClick }: Props) => {
  const { providerStyle } = useProviders();
  const { icon } = providerStyle(id);

  return (
    <Button
      onClick={() => onClick(id)}
      variant="light"
      size="lg"
      sx={(t) => ({
        width: '100%',
      })}
      styles={{ inner: { justifyContent: 'flex-start' } }}
    >
      <Group spacing={12} position="left">
        {icon}
        <Box>
          <Text size="md" weight={500} component="p">
            Continue with <span>{name}</span>
          </Text>
        </Box>
      </Group>
    </Button>
  );
};

export default ProviderButton;
