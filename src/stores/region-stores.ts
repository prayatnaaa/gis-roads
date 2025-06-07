import { getAllRegion } from "@/actions/get-all-region";
import type { AllRegionProps } from "@/lib/region-type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface RegionState extends AllRegionProps {
  isError: boolean;
  isLoaded: boolean;
  fetchRegion: (token: string) => void;
}

export const useRegionStore = create<RegionState>()(
  devtools(
    persist(
      (set, get) => ({
        provinsi: [],
        kecamatan: [],
        kabupaten: [],
        desa: [],
        isError: false,
        isLoaded: false,
        fetchRegion: async (token: string) => {
          try {
            if (get().isLoaded) return;
            const response = await getAllRegion(token);

            if (!response.success) {
              set((state) => ({ ...state, isError: true }));
              return;
            }

            set((state) => ({
              ...state,
              provinsi: response.data?.provinsi,
              kabupaten: response.data?.kabupaten,
              kecamatan: response.data?.kecamatan,
              desa: response.data?.desa,
              isError: false,
              isLoaded: true,
            }));
          } catch (error) {
            set((state) => ({ ...state, isError: true }));
          }
        },
      }),
      {
        name: "region-storage",
        partialize: (state) => ({
          provinsi: state.provinsi,
          kabupaten: state.kabupaten,
          kecamatan: state.kecamatan,
          desa: state.desa,
          isLoaded: state.isLoaded,
        }),
      }
    )
  )
);
