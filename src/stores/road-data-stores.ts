import { getAllRoads, type Road } from "@/actions/get-all-roads";
import { create } from "zustand";

interface RoadState {
  roads: Road[];
  isError: boolean;
  fetchRoad: (token: string) => void;
}

export const useRoadStore = create<RoadState>()((set) => ({
  roads: [],
  isError: false,
  fetchRoad: async (token: string) => {
    try {
      const response = await getAllRoads(token);

      if (!response || response.length === 0) {
        set({ isError: true, roads: [] });
        return;
      }

      set({
        roads: response,
        isError: false,
      });
    } catch (error) {
      set({ isError: true, roads: [] });
    }
  },
}));
