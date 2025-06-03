import { create } from "zustand";

const DEFAULT_LOCATION: [number, number] = [-8.409518, 115.188919];

type LocationStore = {
  id: string;
  location: [number, number];
  zoomLevel: number;
  isSelected: boolean;
  setLocation: (lat: number, lng: number, id: string) => void;
  resetLocation: () => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  id: "null",
  location: DEFAULT_LOCATION,
  isSelected: false,
  zoomLevel: 13,
  setLocation: (lat, lng, id) =>
    set(() => ({
      location: [lat, lng],
      isSelected: true,
      id: id,
      zoomLevel: 7,
    })),
  resetLocation: () => set(() => ({ isSelected: false, id: "null" })),
}));
