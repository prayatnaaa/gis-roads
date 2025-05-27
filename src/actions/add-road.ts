import type { AddRoadFormData, AddRoadResponse } from "@/lib/add-road-types";

let counter = 0;

function generateUniqueNumber(): number {
  const now = Date.now();
  const random = Math.floor(Math.random() * 1e6);
  counter++;

  return Number(`${now}${random}${counter}`);
}

export const addRoad = async (
  formData: AddRoadFormData,
  token: string | null
): Promise<AddRoadResponse> => {
  const fd = new FormData();

  try {
    fd.append("desa_id", formData.village_id.toString());
    if (!formData.road_code) {
      fd.append("kode_ruas", generateUniqueNumber().toString());
    }
    fd.append("nama_ruas", formData.road_name);
    fd.append("panjang", formData.length.toString());
    fd.append("lebar", formData.width.toString());
    fd.append("eksisting_id", formData.existing_id.toString());
    fd.append("kondisi_id", formData.condition_id.toString());
    fd.append("jenisjalan_id", formData.type_id.toString());
    if (formData.description) {
      fd.append("keterangan", formData.description);
    }

    fd.append("paths", JSON.stringify(formData.paths));

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/ruasjalan`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
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
      message: "Successfully add road!",
      data: {
        road_code: data.ruasjalan.koderuas,
        paths: data.ruasjalan.paths,
        village_id: data.ruasjalan.desa_id,
        road_name: data.ruasjalan.nama_ruas,
        length: data.ruasjalan.panjang,
        width: data.ruasjalan.lebar,
        existing_id: data.ruasjalan.eksisting_id,
        condition_id: data.ruasjalan.kondisi_id,
        type_id: data.ruasjalan.jenisjalan_id,
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
