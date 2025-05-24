export type AllRegionProps = {
  provinsi: ProvinceProps[];
  kabupaten: RegencyProps[];
  kecamatan: SubdistrictProps[];
  desa: VillageProps[];
};

export type ProvinceProps = {
  id: number;
  provinsi: string;
};

export type RegencyProps = {
  id: number;
  prov_id: number;
  kabupaten: string;
};

export type SubdistrictProps = {
  id: number;
  kab_id: number;
  kecamatan: string;
};

export type VillageProps = {
  id: number;
  kec_id: number;
  desa: string;
};

export type RegionResult = {
  success: boolean;
  status?: number;
  message: string;
  data?: AllRegionProps;
};
