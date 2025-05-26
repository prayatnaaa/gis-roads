import type { LatLngBounds } from "leaflet";

export type AddRoadProps = {
  paths: LatLngBounds[];
  village_id: number;
  road_code: number;
  road_name: string;
  length: number;
  width: number;
  existing_id: number;
  condition_id: number;
  type_id: number;
  description: string;
};
