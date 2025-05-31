import { create } from "zustand";

const DEFAULT_LOCATION: [number, number] = [-8.409518, 115.188919];

type LocationStore = {
  id: string;
  location: [number, number];
  isSelected: boolean;
  setLocation: (lat: number, lng: number, id: string) => void;
  resetLocation: () => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  id: "null",
  location: DEFAULT_LOCATION,
  isSelected: false,
  setLocation: (lat, lng, id) =>
    set(() => ({ location: [lat, lng], isSelected: true, id: id })),
  resetLocation: () =>
    set(() => ({ location: DEFAULT_LOCATION, isSelected: false, id: "null" })),
}));
