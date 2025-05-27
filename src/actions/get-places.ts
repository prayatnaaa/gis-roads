import type {
  GetDistrictProps,
  GetRegencyProps,
  GetVillageProps,
} from "@/lib/region-type";

export const getRegency = async (token: string): Promise<GetRegencyProps> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/kabupaten/1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return {
        status: "false",
        message: "Failed to fetch region data",
        code: response.status,
      };
    }

    const data = await response.json();

    return {
      code: data.code,
      status: "success",
      data: { kabupaten: data.kabupaten },
    };
  } catch (error) {
    console.error("Error fetching region data:", error);
    return {
      status: "false",
      code: 401,
      message: "Error occurred while fetching region data",
    };
  }
};

export const getDistrict = async (
  token: string,
  regencyId: number
): Promise<GetDistrictProps> => {
  console.log(regencyId);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/kecamatan/${regencyId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return {
        status: "false",
        message: "Failed to fetch region data",
        code: response.status,
      };
    }

    const data = await response.json();

    return {
      code: data.code,
      status: "success",
      data: { kecamatan: data.kecamatan },
    };
  } catch (error) {
    console.error("Error fetching region data:", error);
    return {
      status: "false",
      code: 401,
      message: "Error occurred while fetching region data",
    };
  }
};

export const getVillage = async (
  token: string,
  districtId: number
): Promise<GetVillageProps> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/desa/${districtId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return {
        status: "false",
        message: "Failed to fetch region data",
        code: response.status,
      };
    }

    const data = await response.json();

    return {
      code: data.code,
      status: "success",
      data: { desa: data.desa },
    };
  } catch (error) {
    console.error("Error fetching region data:", error);
    return {
      status: "false",
      code: 401,
      message: "Error occurred while fetching region data",
    };
  }
};
