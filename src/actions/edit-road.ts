import type { AddRoadFormData, AddRoadResponse } from "@/lib/add-road-types";

export const updateRoad = async (
  id: number,
  formData: AddRoadFormData,
  token: string | null
): Promise<AddRoadResponse> => {
  if (!token) {
    return {
      message: "Unauthorized",
      status: "failed",
      code: 401,
    };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/ruasjalan/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          desa_id: formData.village_id,
          kode_ruas: formData.road_code,
          nama_ruas: formData.road_name,
          panjang: formData.length,
          lebar: formData.width,
          eksisting_id: formData.existing_id,
          kondisi_id: formData.condition_id,
          jenisjalan_id: formData.type_id,
          keterangan: formData.description,
          paths: formData.paths,
        }),
      }
    );

    if (!response.ok) {
      return {
        message: "Something went wrong",
        status: "failed",
        code: response.status,
      };
    }

    const data = await response.json();

    return {
      code: 200,
      status: "success",
      message: "Successfully updated road!",
      data: {
        road_code: data.ruasjalan.kode_ruas,
        paths: data.ruasjalan.paths,
        village_id: Number(data.ruasjalan.desa_id),
        road_name: data.ruasjalan.nama_ruas,
        length: Number(data.ruasjalan.panjang),
        width: Number(data.ruasjalan.lebar),
        existing_id: Number(data.ruasjalan.eksisting_id),
        condition_id: Number(data.ruasjalan.kondisi_id),
        type_id: Number(data.ruasjalan.jenisjalan_id),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong",
      status: "failed",
      code: 400,
    };
  }
};
