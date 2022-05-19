import { Paper } from '@mantine/core';
import React from 'react';
import { EventWithOrganization } from 'types/event';

import GoogleMapReact from 'google-map-react';
import config from 'lib/config';

interface Props {
  event: EventWithOrganization;
  loading: boolean;
}

const AnyReactComponent = ({ text, lat, lng }) => <div>{text}</div>;

const EventMap = ({ event, loading }: Props) => {
  const defaultProps = {
    center: {
      lat: 59.955413,
      lng: 59.955413,
    },
    zoom: 11,
  };

  return (
    <Paper
      radius="md"
      p={0}
      sx={() => ({ height: 348, width: '100%', overflow: 'hidden' })}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key:config.google.mapsKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent lat={59.955413} lng={59.955413} text="My Marker" />
      </GoogleMapReact>
    </Paper>
  );
};

export default EventMap;
