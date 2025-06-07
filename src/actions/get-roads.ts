export type Coordinate = {
  lat: number;
  lng: number;
};

export type Road = {
  id: number;
  paths: string | Coordinate[];
  desa_id: number;
  kode_ruas: string;
  nama_ruas: string;
  panjang: number;
  lebar: number;
  eksisting_id: number;
  kondisi_id: number;
  jenisjalan_id: number;
  keterangan: string;
};

type GetRoadByIdProps = {
  code: number;
  status: "success" | "failed";
  road?: Road;
};

function isValidCoordinateArray(data: any): data is Coordinate[] {
  return (
    Array.isArray(data) &&
    data.every(
      (point) => typeof point.lat === "number" && typeof point.lng === "number"
    )
  );
}

function isValidPolylineString(path: string): boolean {
  return typeof path === "string" && path.length > 0 && !path.includes("{");
}

export async function getAllRoads(token: string): Promise<{
  message: string;
  code: number;
  data: Road[];
}> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/ruasjalan`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return { message: "Something went wrong", code: response.status, data: [] };
  }

  const data = await response.json();

  if (!data.ruasjalan || !Array.isArray(data.ruasjalan)) {
    throw new Error("Invalid response format");
  }

  const validRoads: Road[] = [];

  for (const road of data.ruasjalan) {
    try {
      const parsed = JSON.parse(road.paths);
      if (isValidCoordinateArray(parsed)) {
        validRoads.push({ ...road, paths: parsed });
        continue;
      }
    } catch {
      console.log("hehhehe");
      //TODO: think later
    }

    if (isValidPolylineString(road.paths)) {
      validRoads.push(road);
    }
  }

  return {
    message: "Successfully fetched roads",
    code: 200,
    data: validRoads,
  };
}

export async function getRoadById({
  token,
  id,
}: {
  token: string;
  id: string;
}): Promise<GetRoadByIdProps> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/ruasjalan/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { code: response.status, status: "failed" };
    }

    const data = await response.json();

    return {
      code: data.code,
      status: data.status,
      road: data.ruasjalan,
    };
  } catch (error) {
    console.error("Error fetching road data:", error);
    throw error;
  }
}
