import {
  getExistingRoad,
  getRoadCondition,
  getRoadType,
} from "@/actions/get-road-status";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PlaceValueProps } from "@/lib/region-type";
import { Funnel } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import CustomSelect from "../atoms/custom-select";

interface FilterDialogProps {
  onFilter: (filters: {
    roadType: PlaceValueProps | null;
    roadCondition: PlaceValueProps | null;
    existing: PlaceValueProps | null;
  }) => void;
}

export function FilterDialog({ onFilter }: FilterDialogProps) {
  const [token, setToken] = React.useState<string | null>(null);
  // const token = localStorage.getItem("token");

  const [roadTypeOptions, setRoadTypeOptions] = React.useState<
    PlaceValueProps[]
  >([]);
  const [roadConditionOptions, setRoadConditionOptions] = React.useState<
    PlaceValueProps[]
  >([]);
  const [existingOptions, setExistingOptions] = React.useState<
    PlaceValueProps[]
  >([]);

  const [selectedType, setSelectedType] =
    React.useState<PlaceValueProps | null>(null);
  const [selectedCondition, setSelectedCondition] =
    React.useState<PlaceValueProps | null>(null);
  const [selectedExisting, setSelectedExisting] =
    React.useState<PlaceValueProps | null>(null);

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  React.useEffect(() => {
    if (!token) return;
    const fetchFilters = async () => {
      try {
        const [typeRes, condRes, existRes] = await Promise.all([
          getRoadType(token as string),
          getRoadCondition(token as string),
          getExistingRoad(token as string),
        ]);

        if (
          typeRes.code === 403 ||
          condRes.code === 403 ||
          existRes.code === 403
        ) {
          toast("Session has ended, please log in again!");
          return;
        }

        setRoadTypeOptions(typeRes.data?.types ?? []);
        setRoadConditionOptions(condRes.data?.condition ?? []);
        setExistingOptions(existRes.data?.exsisting ?? []);
      } catch (error) {
        toast("Failed to load filter options");
      }
    };

    fetchFilters();
  }, [token]);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFilter({
        roadType: selectedType,
        roadCondition: selectedCondition,
        existing: selectedExisting,
      });
    },
    [selectedType, selectedCondition, selectedExisting, onFilter]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="hover:cursor-pointer">
          <Funnel />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-description="filters-dialog"
        aria-describedby="filters"
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Filter Roads</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <CustomSelect
              values={roadTypeOptions}
              value={selectedType}
              label="Road Type"
              onChange={setSelectedType}
            />
            <CustomSelect
              values={roadConditionOptions}
              value={selectedCondition}
              label="Road Condition"
              onChange={setSelectedCondition}
            />
            <CustomSelect
              value={selectedExisting}
              values={existingOptions}
              label="Existing"
              onChange={setSelectedExisting}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Apply Filters</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
