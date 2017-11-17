export interface MapMarkerData {
  title: string;
}

export interface MapMarkerObj {
  id: number;
  lat: number;
  lng: number;
  classNames?: string;
  data: MapMarkerData;
}
