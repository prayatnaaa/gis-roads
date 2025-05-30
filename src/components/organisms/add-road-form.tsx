import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox } from "../molecules/combo-box";
import {
  getExistingRoad,
  getRoadCondition,
  getRoadType,
} from "@/actions/get-road-status";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { PlaceValueProps } from "@/lib/region-type";
import { addRoadSchema, type AddRoadFormData } from "@/lib/add-road-types";
import { Button } from "../ui/button";
import { addRoad } from "@/actions/add-road";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { useRegionStore } from "@/stores/region-stores";

type AddRoadFormProps = {
  paths: { lat: number; lng: number }[];
  length: number;
};

const AddRoadForm = ({ paths, length }: AddRoadFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddRoadFormData>({
    resolver: zodResolver(addRoadSchema),
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const kabupaten = useRegionStore((state) => state.kabupaten);
  const kecamatan = useRegionStore((state) => state.kecamatan);
  const desa = useRegionStore((state) => state.desa);

  const [existingValue, setExistingValue] = React.useState<PlaceValueProps[]>(
    []
  );
  const [roadValues, setRoadValues] = React.useState<PlaceValueProps[]>([]);
  const [roadConditions, setRoadConditions] = React.useState<PlaceValueProps[]>(
    []
  );

  const [regencyId, setRegencyId] = React.useState<number | null>(null);
  const [districtId, setDistrictId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!token) return;
    (async () => {
      const response = await getExistingRoad(token);
      const existing =
        response.data?.exsisting.map((e) => ({ id: e.id, value: e.value })) ||
        [];
      setExistingValue(existing);
    })();
  }, [token]);

  React.useEffect(() => {
    if (!token) return;
    (async () => {
      const response = await getRoadType(token);
      const types =
        response.data?.types.map((t) => ({ id: t.id, value: t.value })) || [];
      setRoadValues(types);
    })();
  }, [token]);

  React.useEffect(() => {
    if (!token) return;
    (async () => {
      const response = await getRoadCondition(token);
      const conditions =
        response.data?.condition.map((c) => ({ id: c.id, value: c.value })) ||
        [];
      setRoadConditions(conditions);
    })();
  }, [token]);

  const filteredDistricts = React.useMemo(
    () => kecamatan.filter((k) => k.kab_id === regencyId),
    [kecamatan, regencyId]
  );

  const filteredVillages = React.useMemo(
    () => desa.filter((d) => d.kec_id === districtId),
    [desa, districtId]
  );

  const triggerSubmit = () => {
    setValue("paths", paths);
    setValue("length", length);
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: AddRoadFormData) => {
    if (paths.length < 2) {
      console.log("path empty");
      return;
    }
    const response = await addRoad(data, token);
    if (response.code == 200) {
      toast("Road has been created");
      navigate("/");
    }
  };

  return (
    <div className="w-1/2 h-screen p-4 flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-lg font-bold">Add Road</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-4">
            <Combobox
              name="Select regency..."
              properties={kabupaten.map((k) => ({
                id: k.id,
                value: k.kabupaten,
              }))}
              onChange={(selected) => {
                setRegencyId(selected.id);
                setDistrictId(null);
                setValue("village_id", undefined as any);
              }}
            />

            {filteredDistricts.length > 0 && (
              <Combobox
                name="Select district..."
                properties={filteredDistricts.map((d) => ({
                  id: d.id,
                  value: d.kecamatan,
                }))}
                onChange={(selected) => {
                  setDistrictId(selected.id);
                  setValue("village_id", undefined as any);
                }}
              />
            )}

            {filteredVillages.length > 0 && (
              <Combobox
                name="Select village..."
                properties={filteredVillages.map((v) => ({
                  id: v.id,
                  value: v.desa,
                }))}
                onChange={(selected) => setValue("village_id", selected.id)}
              />
            )}

            {errors.village_id && (
              <p className="text-red-500 text-sm">
                {errors.village_id.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {existingValue.length > 0 && (
              <Controller
                control={control}
                name="existing_id"
                render={({ field }) => (
                  <Combobox
                    name="Select existing material..."
                    properties={existingValue}
                    onChange={(selected) => field.onChange(selected.id)}
                  />
                )}
              />
            )}

            {errors.existing_id && (
              <p className="text-red-500 text-sm">
                {errors.existing_id.message}
              </p>
            )}

            {roadValues.length > 0 && (
              <Controller
                control={control}
                name="type_id"
                render={({ field }) => (
                  <Combobox
                    name="Select road type..."
                    properties={roadValues}
                    onChange={(selected) => field.onChange(selected.id)}
                  />
                )}
              />
            )}

            {errors.type_id && (
              <p className="text-red-500 text-sm">{errors.type_id.message}</p>
            )}

            {roadConditions.length > 0 && (
              <Controller
                control={control}
                name="condition_id"
                render={({ field }) => (
                  <Combobox
                    name="Select road condition..."
                    properties={roadConditions}
                    onChange={(selected) => field.onChange(selected.id)}
                  />
                )}
              />
            )}

            {errors.condition_id && (
              <p className="text-red-500 text-sm">
                {errors.condition_id.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="road-name" className="opacity-60">
            Road's name
          </Label>
          <Input
            id="road-name"
            type="text"
            placeholder="Set the road's name"
            {...register("road_name")}
          />
          {errors.road_name && (
            <p className="text-red-500 text-sm">{errors.road_name.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="road-desc" className="opacity-60">
            Description
          </Label>
          <Textarea
            id="road-desc"
            placeholder="Set description for the road"
            {...register("description")}
          />
        </div>

        <div className="flex flex-row justify-between">
          <div className="space-y-1.5">
            <Label htmlFor="width" className="opacity-60">
              Width
            </Label>
            <Input
              type="number"
              placeholder="Set road width"
              {...register("width", { valueAsNumber: true })}
            />
          </div>
        </div>

        <Button
          className="mt-2 hover:cursor-pointer"
          type="button"
          disabled={isSubmitting}
          onClick={triggerSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddRoadForm;
