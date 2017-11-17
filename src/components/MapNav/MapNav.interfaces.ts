import { MapMarkerObj } from '../MapMarker/MapMarker.interfaces';

export interface MapNavProps {
  API_KEY: string;
  matchingZoneRadius: number; // meters
  markers: MapMarkerObj[];
  handleResults(results : MapMarkerObj[]) : any[];

  isVisible?: boolean;
  language?: string;
  defaultZoom?: number;
}

export interface MapNavState {
  lat: number;
  lng: number;
  matchingResults: MapMarkerObj[];
}
