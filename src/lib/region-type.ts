export type AllRegionProps = {
  provinsi: ProvinceProps[];
  kabupaten: RegencyProps[];
  kecamatan: SubdistrictProps[];
  desa: VillageProps[];
};

export type ProvinceProps = {
  id: number;
  value: string;
};

export type RegencyProps = {
  id: number;
  prov_id: number;
  value: string;
};

export type SubdistrictProps = {
  id: number;
  kab_id: number;
  value: string;
};

export type VillageProps = {
  id: number;
  kec_id: number;
  value: string;
};

export type RegionResult = {
  success: boolean;
  status?: number;
  message: string;
  data?: AllRegionProps;
};

export type PlaceValueProps = {
  id: number;
  value: string;
};

export type GetPlacesProps<T = unknown> = {
  code: number;
  status: "success" | "false";
  message?: string;
  data?: T;
};

export type ProvincePropsR = GetPlacesProps<{
  province: PlaceValueProps[];
}>;
export type GetDistrictProps = GetPlacesProps<{
  kecamatan: PlaceValueProps[];
}>;
export type GetVillageProps = GetPlacesProps<{
  desa: PlaceValueProps[];
}>;

export type GetRegencyProps = GetPlacesProps<{
  kabupaten: PlaceValueProps[];
}>;

export type GetExistingRoadProps = GetPlacesProps<{
  exsisting: PlaceValueProps[];
}>;

export type GetRoadTypeProps = GetPlacesProps<{
  types: PlaceValueProps[];
}>;

export type GetRoadConditionProps = GetPlacesProps<{
  condition: PlaceValueProps[];
}>;
