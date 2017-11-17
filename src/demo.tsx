import React from 'react';
import ReactDOM from 'react-dom';
import { MapNavProps } from 'components/MapNav/MapNav.interfaces';
import MapNav from './components/MapNav/MapNav';
import {AR} from './index';

const markers = [
  {
    id: 0,
    lat: 48.10901111,
    lng: -1.6075148,
    data: {
      title: 'toto',
    },
  },
  {
    id: 1,
    lat: 48.13034209,
    lng: -1.7888197,
    data: {
      title: 'tintin',
    },
  },
  {
    id: 2,
    lat: 48.11934215,
    lng: -1.4555180,
    data: {
      title: 'tata',
    },
  },
  {
    id: 3,
    lat: 48.15555250,
    lng: -1.8105111,
    data: {
      title: 'tutu',
    },
  },
  {
    id: 4,
    lat: 48.118522399999996,
    lng: -1.652105,
    data: {
      title: 'tete',
    },
  },
  {
    id: 5,
    lat: 48.118522399999996,
    lng: -1.652105,
    data: {
      title: 'titi',
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

const fullScreenStyle: any = { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 };

ReactDOM.render(
  <div style={fullScreenStyle}>
    <MapNav { ...initMapNav() } />
    {/*<AR />*/}
  </div>,
  document.getElementById('root'),
);
