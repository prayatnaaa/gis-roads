import { getAllRegion } from "@/actions/get-all-region";
import type { AllRegionProps } from "@/lib/region-type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface RegionState extends AllRegionProps {
  isError: boolean;
  fetchRegion: (token: string) => void;
}

export const useRegionStore = create<RegionState>()(
  devtools(
    persist(
      (set) => ({
        provinsi: [],
        kecamatan: [],
        kabupaten: [],
        desa: [],
        isError: false,
        fetchRegion: async (token: string) => {
          try {
            const response = await getAllRegion(token);

            if (!response.success) {
              set({ isError: true });
              return;
            }

            set({
              provinsi: response.data?.provinsi,
              kabupaten: response.data?.kabupaten,
              kecamatan: response.data?.kecamatan,
              desa: response.data?.desa,
              isError: false,
            });
          } catch (error) {
            set({ isError: true });
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
        }),
      }
    )
  )
);
