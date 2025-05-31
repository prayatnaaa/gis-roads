import { create } from "zustand";

type LocationStore = {
  location: [number, number];
  setLocation: (lat: number, lng: number) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: [0, 0],
  setLocation: (lat, lng) => set(() => ({ location: [lat, lng] })),
}));
