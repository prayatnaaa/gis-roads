import type { RegionResult } from "@/lib/region-type";

export const getAllRegion = async (token: string): Promise<RegionResult> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/mregion`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { success: false, message: "Failed to fetch region data" };
    }

    const data = await response.json();

    return {
      success: true,
      status: data.code,
      message: data.status,
      data: {
        provinsi: (data.provinsi ?? []).map((item: any) => ({
          id: item.id,
          value: item.provinsi,
        })),
        kabupaten: (data.kabupaten ?? []).map((item: any) => ({
          id: item.id,
          prov_id: item.prov_id,
          value: item.kabupaten,
        })),
        kecamatan: (data.kecamatan ?? []).map((item: any) => ({
          id: item.id,
          kab_id: item.kab_id,
          value: item.kecamatan,
        })),
        desa: (data.desa ?? []).map((item: any) => ({
          id: item.id,
          kec_id: item.kec_id,
          value: item.desa,
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching region data:", error);
    return {
      success: false,
      message: "Error occurred while fetching region data",
    };
  }
};
