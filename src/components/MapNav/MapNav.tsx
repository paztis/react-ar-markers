import React from 'react';
import GoogleMapReact from 'google-map-react'; // check https://github.com/istarkov/google-map-react
import geolib from 'geolib'; // check https://github.com/manuelbieh/Geolib
import { MapNavProps, MapNavState } from './MapNav.interfaces';
import MapMarker from '../MapMarker/MapMarker';

export default class MapNav extends React.Component<MapNavProps, MapNavState> {
  private watchID: any;

  constructor() {
    super();
    this.state = {
      lat: 48.11734209,
      lng: -1.7075198,
      matchingResults: [],
    };
    this.watchID = null;
  }

  componentDidMount() {
    console.info('>>> componentDidMount');
    /*
     * Start tracking position and
     * based on matching zone radius we handle results
     */
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.info('>>> position', position);
      this.setState(
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        this.handleMatchingResults,
      );
    });
  }

  componentWillUnmount() {
    console.info('>>> componentWillUnmount');
    navigator.geolocation.clearWatch(this.watchID);
  }

  handleMatchingResults() {
    const { matchingZoneRadius, markers, handleResults } = this.props;
    const { lat, lng } = this.state;
    let matchingResults = [];
    for (let i = 0; i < markers.length; i += 1) {
      const currentMarker = markers[i];
      const distance = geolib.getDistance(
        { // start
          latitude: lat,
          longitude: lng,
        },
        { // end
          latitude: currentMarker.lat,
          longitude: currentMarker.lng,
        },
        10, // accuracy -> hardcoded for now
        1, // precision -> hardcoded for now
      );

      if (Math.abs(distance) <= matchingZoneRadius) {
        // Add current marker to matching results
        matchingResults = [
          ...matchingResults,
          currentMarker,
        ];
      } else {
        // Remove current marker from matching results
        matchingResults = matchingResults.filter(marker => marker.id !== currentMarker.id);
      }
    }
    this.setState({ matchingResults }, () => {
      if (matchingResults.length) {
        handleResults(matchingResults);
      }
    });
  }

  render() {
    console.info('>>> MapNav renders:', this);
    const { lat, lng } = this.state;
    const { markers, API_KEY, language = 'fr', defaultZoom = 12, isVisible = true } = this.props;
    let template = null;

    if (isVisible) {
      template = <GoogleMapReact
        bootstrapURLKeys={{
          language,
          key: API_KEY,
        }}
        center={{ lat, lng }}
        defaultZoom={defaultZoom}
      >
        {markers.map(marker => <MapMarker key={marker.id} lat={marker.lat} lng={marker.lng}
                                          title={marker.data.title}/>)}
        <MapMarker key="customer" classNames="me" lat={lat} lng={lng} title="ME"/>
      </GoogleMapReact>;
    }

    return template;
  }
}

export { MapNav };
