type Coordinate = {
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

export async function getAllRoads(token: string): Promise<Road[]> {
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
    throw new Error("Failed to fetch roads");
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
      //TODO: think later
    }

    if (isValidPolylineString(road.paths)) {
      validRoads.push(road);
    }
  }

  return validRoads;
}
