import React from 'react';
import ReactDOM from 'react-dom';
import { MapNavProps } from 'components/MapNav/MapNav.interfaces';
import MapNav from './components/MapNav/MapNav';

const markers = [
  {
    id: 0,
    lat: 48.10901111,
    lng: -1.6075148,
    data: {
      title: '0',
    },
  },
  {
    id: 1,
    lat: 48.13034209,
    lng: -1.7888197,
    data: {
      title: '1',
    },
  },
  {
    id: 2,
    lat: 48.11934215,
    lng: -1.4555180,
    data: {
      title: '2',
    },
  },
  {
    id: 3,
    lat: 48.15555250,
    lng: -1.8105111,
    data: {
      title: '3',
    },
  },
  {
    id: 4,
    lat: 48.118522399999996,
    lng: -1.652105,
    data: {
      title: '4',
    },
  },
  {
    id: 5,
    lat: 48.118522399999996,
    lng: -1.652105,
    data: {
      title: '5',
    },
  },
];

function initMapNav() : MapNavProps {
  return {
    markers,
    API_KEY: '',
    matchingZoneRadius: 10,
    handleResults: (results) => {console.warn('>>>> RESULTS =', results);},
  };
}


ReactDOM.render(
  <MapNav { ...initMapNav() } />,
  document.getElementById('root'),
);
