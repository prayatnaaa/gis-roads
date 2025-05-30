import { getAllRoads, type Road } from "@/actions/get-all-roads";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface RoadState {
  roads: Road[];
  isError: boolean;
  isLoaded: boolean;
  fetchRoad: (token: string) => void;
}

export const useRoadStore = create<RoadState>()(
  devtools(
    persist(
      (set) => ({
        roads: [],
        isError: false,
        isLoaded: false,
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
              isLoaded: true,
            });
          } catch (error) {
            set({ isError: true, roads: [] });
          }
        },
      }),
      {
        name: "road-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
