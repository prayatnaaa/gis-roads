import type { LatLngLiteral } from "leaflet";

type NominatinProps = {
  status: "failed" | "success";
  message: string;
  coordinates?: LatLngLiteral;
};

export const nominatimSearch = async (
  query: string
): Promise<NominatinProps> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query}&format=geojson`
  );

  if (!response.ok) {
    return { status: "failed", message: "Something went wrong" };
  }

  const data = await response.json();

  return {
    status: "success",
    message: "success to retrieved data",
    coordinates: data.features[0].geometry.coordinates,
    // coordinates: data.features[0].bbox,
  };
};
