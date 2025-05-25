import React from "react";
import { Combobox } from "../molecules/combo-box";
import { getDistrict, getRegency, getVillage } from "@/actions/get-places";
import type { PlaceValueProps } from "@/lib/region-type";
import { getExistingRoad } from "@/actions/get-road-status";
import type { ExistingRoad } from "@/lib/existing-road-types";

const AddRoadForm = () => {
  const [regencyValues, setRegencyValues] = React.useState<PlaceValueProps[]>(
    []
  );
  const [districtValues, setDistrictValues] = React.useState<PlaceValueProps[]>(
    []
  );
  const [villageValues, setVillageValues] = React.useState<PlaceValueProps[]>(
    []
  );

  const [existRoad, setExistRoad] = React.useState<ExistingRoad[]>([]);

  const [regencyId, setRegencyId] = React.useState<number | null>(null);
  const [districtId, setDistrictId] = React.useState<number | null>(null);

  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const fetchExistRoad = async () => {
      const response = await getExistingRoad(token as string);
      const roads = (response.data as ExistingRoad[]).map((exsist) => ({
        id: exsist.id,
        eksisting: exsist.eksisting,
      }));
      setExistRoad(roads);
    };

    fetchExistRoad();
  }, [token]);

  React.useEffect(() => {
    const fetchRegency = async () => {
      if (!token) return;
      const response = await getRegency(token);
      const regencies =
        response.data?.kabupaten.map((regency) => ({
          id: regency.id,
          value: regency.value,
        })) || [];
      setRegencyValues(regencies);
    };

    fetchRegency();
  }, [token]);

  React.useEffect(() => {
    const fetchDistrict = async () => {
      if (!token || regencyId === null) return;

      const response = await getDistrict(token, regencyId);
      const districts =
        response.data?.kecamatan.map((district) => ({
          id: district.id,
          value: district.value,
        })) || [];
      setDistrictValues(districts);
      setVillageValues([]);
    };

    fetchDistrict();
  }, [token, regencyId]);

  React.useEffect(() => {
    const fetchVillage = async () => {
      if (!token || districtId === null) return;

      const response = await getVillage(token, districtId);
      const villages =
        response.data?.desa.map((village) => ({
          id: village.id,
          value: village.value,
        })) || [];
      setVillageValues(villages);
    };

    fetchVillage();
  }, [token, districtId]);

  return (
    <div className="w-1/2 h-screen p-4 flex flex-col gap-8">
      <h1 className="text-lg font-bold text-white">Add Road</h1>
      <form className="flex flex-col gap-4">
        <Combobox
          properties={regencyValues}
          onChange={(selected) => {
            setRegencyId(selected.id);
            setDistrictId(null);
            setDistrictValues([]);
            setVillageValues([]);
          }}
        />
        {districtValues.length > 0 && (
          <Combobox
            properties={districtValues}
            onChange={(selected) => {
              setDistrictId(selected.id);
              setVillageValues([]);
            }}
          />
        )}
        {villageValues.length > 0 && <Combobox properties={villageValues} />}
      </form>
    </div>
  );
};

export default AddRoadForm;
