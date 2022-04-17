import { Button, Group } from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';

const Spotlight = () => {
  const spotlight = useSpotlight();
  return (
    <Group position="center">
      <Button onClick={spotlight.openSpotlight}>Open spotlight</Button>
    </Group>
  );
};

export default Spotlight;
