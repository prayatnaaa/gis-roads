import React from "react";
import { Combobox } from "../molecules/combo-box";
import { getDistrict, getRegency, getVillage } from "@/actions/get-places";
import type { PlaceValueProps } from "@/lib/region-type";
import {
  getExistingRoad,
  getRoadCondition,
  getRoadType,
} from "@/actions/get-road-status";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";

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

  const [existingValue, setExistingValue] = React.useState<PlaceValueProps[]>(
    []
  );
  const [roadValues, setRoadValues] = React.useState<PlaceValueProps[]>([]);
  const [roadConditions, setRoadConditions] = React.useState<PlaceValueProps[]>(
    []
  );

  const [regencyId, setRegencyId] = React.useState<number | null>(null);
  const [districtId, setDistrictId] = React.useState<number | null>(null);
  const [villageId, setVillageId] = React.useState<number | null>(null);

  const token = localStorage.getItem("token");

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
    const fetchExisting = async () => {
      if (!token) return;
      const response = await getExistingRoad(token);
      const existing =
        response.data?.exsisting.map((exist) => ({
          id: exist.id,
          value: exist.value,
        })) || [];
      setExistingValue(existing);
    };

    fetchExisting();
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

  React.useEffect(() => {
    const fetchRoadTypes = async () => {
      if (!token) return;

      const response = await getRoadType(token);
      const roadTypes =
        response.data?.types.map((type) => ({
          id: type.id,
          value: type.value,
        })) || [];

      setRoadValues(roadTypes);
    };

    fetchRoadTypes();
  }, [token]);

  React.useEffect(() => {
    const fetchRoadCondition = async () => {
      if (!token) return;

      const response = await getRoadCondition(token);
      const roadTypes =
        response.data?.condition.map((cond) => ({
          id: cond.id,
          value: cond.value,
        })) || [];

      setRoadConditions(roadTypes);
    };

    fetchRoadCondition();
  }, [token]);

  return (
    <div className="w-1/2 h-screen p-4 flex flex-col gap-8">
      <h1 className="text-lg font-bold text-white">Add Road</h1>
      <form className="flex flex-col space-y-4">
        <div className="w-full flex flex-row items-start gap-4">
          <div className="flex flex-col gap-4">
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
            {villageValues.length > 0 && (
              <Combobox
                properties={villageValues}
                onChange={(selected) => {
                  setVillageId(selected.id);
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            {existingValue.length > 0 && (
              <Combobox properties={existingValue} />
            )}
            {roadValues.length > 0 && <Combobox properties={roadValues} />}
            {roadConditions.length > 0 && (
              <Combobox properties={roadConditions} />
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="road-name" className="opacity-60">
            Road's name
          </Label>
          <Input id="road-name" type="text" placeholder="Set the road's name" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="road-desc" className="opacity-60">
            Description
          </Label>
          <Textarea id="road-desc" placeholder="Set description for the road" />
        </div>
      </form>
    </div>
  );
};

export default AddRoadForm;
