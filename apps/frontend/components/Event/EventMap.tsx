import { Box, Paper } from '@mantine/core';
import { EventWithOwner } from 'types/api/event';

import GoogleMapReact from 'google-map-react';
import config from 'lib/config';

interface Props {
  event: EventWithOwner;
  loading: boolean;
}

const AnyReactComponent = ({ lat, lng }) => (
  <Box
    sx={() => ({
      width: 14,
      height: 14,
      color: 'white',
      borderRadius: 10000,
    })}
  />
);

const EventMap = ({ event, loading }: Props) => {
  const defaultProps = {
    center: {
      lat: 45.815399,
      lng: 15.966568,
    },
    zoom: 12,
  };

  return (
    <Paper
      radius="md"
      p={0}
      sx={() => ({ height: 348, width: '100%', overflow: 'hidden' })}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.google.mapsKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent lat={45.815399} lng={15.966568} />
      </GoogleMapReact>
    </Paper>
  );
};

export default EventMap;
