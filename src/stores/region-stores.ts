import { create } from "zustand";
import localforage from "localforage";
import { getAllRegion } from "@/actions/get-all-region";
import type { AllRegionProps } from "@/lib/region-type";
import { isExpired } from "@/lib/cache-utils";

interface RegionState extends AllRegionProps {
  isLoaded: boolean;
  isError: boolean;
  fetchRegion: (token: string) => Promise<void>;
}

interface CachedRegionData extends AllRegionProps {
  timestamp: number;
}

const REGION_CACHE_KEY = "region-data";
const EXPIRY_DURATION = 1000 * 60 * 60 * 24 * 7;

export const useRegionStore = create<RegionState>((set) => ({
  provinsi: [],
  kabupaten: [],
  kecamatan: [],
  desa: [],
  isLoaded: false,
  isError: false,

  fetchRegion: async (token: string) => {
    try {
      const cached = await localforage.getItem<CachedRegionData>(
        REGION_CACHE_KEY
      );

      if (cached && !isExpired(cached.timestamp, EXPIRY_DURATION)) {
        set({
          provinsi: cached.provinsi,
          kabupaten: cached.kabupaten,
          kecamatan: cached.kecamatan,
          desa: cached.desa,
          isLoaded: true,
          isError: false,
        });
        return;
      }

      const response = await getAllRegion(token);
      if (!response.success || !response.data) {
        set({ isError: true });
        return;
      }

      const freshData: CachedRegionData = {
        provinsi: response.data.provinsi,
        kabupaten: response.data.kabupaten,
        kecamatan: response.data.kecamatan,
        desa: response.data.desa,
        timestamp: Date.now(),
      };

      await localforage.setItem(REGION_CACHE_KEY, freshData);

      set({
        provinsi: freshData.provinsi,
        kabupaten: freshData.kabupaten,
        kecamatan: freshData.kecamatan,
        desa: freshData.desa,
        isLoaded: true,
        isError: false,
      });
    } catch (error) {
      console.error("Fetch region failed:", error);
      set({ isError: true });
    }
  },
}));
