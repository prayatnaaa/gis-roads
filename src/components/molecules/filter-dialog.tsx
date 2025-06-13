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
import { MultiSelect } from "./multi-select";

interface FilterDialogProps {
  onFilter: (filters: {
    roadType: PlaceValueProps[];
    roadCondition: PlaceValueProps[];
    existing: PlaceValueProps[];
  }) => void;
}

export function FilterDialog({ onFilter }: FilterDialogProps) {
  const [token, setToken] = React.useState<string | null>(null);

  const [roadTypeOptions, setRoadTypeOptions] = React.useState<
    PlaceValueProps[]
  >([]);
  const [roadConditionOptions, setRoadConditionOptions] = React.useState<
    PlaceValueProps[]
  >([]);
  const [existingOptions, setExistingOptions] = React.useState<
    PlaceValueProps[]
  >([]);

  // Nilai yang disimpan setelah Apply
  const [selectedType, setSelectedType] = React.useState<PlaceValueProps[]>([]);
  const [selectedCondition, setSelectedCondition] = React.useState<
    PlaceValueProps[]
  >([]);
  const [selectedExisting, setSelectedExisting] = React.useState<
    PlaceValueProps[]
  >([]);

  // Nilai sementara di dialog
  const [tempSelectedType, setTempSelectedType] = React.useState<
    PlaceValueProps[]
  >([]);
  const [tempSelectedCondition, setTempSelectedCondition] = React.useState<
    PlaceValueProps[]
  >([]);
  const [tempSelectedExisting, setTempSelectedExisting] = React.useState<
    PlaceValueProps[]
  >([]);

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  React.useEffect(() => {
    if (!token) return;

    const fetchFilters = async () => {
      try {
        const [typeRes, condRes, existRes] = await Promise.all([
          getRoadType(token),
          getRoadCondition(token),
          getExistingRoad(token),
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (open) {
      setTempSelectedType(selectedType);
      setTempSelectedCondition(selectedCondition);
      setTempSelectedExisting(selectedExisting);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSelectedType(tempSelectedType);
    setSelectedCondition(tempSelectedCondition);
    setSelectedExisting(tempSelectedExisting);

    onFilter({
      roadType: tempSelectedType,
      roadCondition: tempSelectedCondition,
      existing: tempSelectedExisting,
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="hover:cursor-pointer">
          <Funnel />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:w-full min-w-fit"
        aria-description="filters-dialog"
        aria-describedby="filters"
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Filter Roads</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="grid gap-1">
              <p className="text-xs opacity-70">Condition</p>
              <MultiSelect
                value={tempSelectedCondition.map((opt) => String(opt.value))}
                options={roadConditionOptions.map((opt) => ({
                  label: opt.value ?? opt.id ?? String(opt.value),
                  value: String(opt.value),
                }))}
                onValueChange={(values: string[]) => {
                  const selected = roadConditionOptions.filter((opt) =>
                    values.includes(String(opt.value))
                  );
                  setTempSelectedCondition(selected);
                }}
              />
            </div>

            <div className="grid gap-1">
              <p className="text-xs opacity-70">Existing</p>
              <MultiSelect
                value={tempSelectedExisting.map((opt) => String(opt.value))}
                options={existingOptions.map((opt) => ({
                  label: opt.value ?? opt.id ?? String(opt.value),
                  value: String(opt.value),
                }))}
                onValueChange={(values: string[]) => {
                  const selected = existingOptions.filter((opt) =>
                    values.includes(String(opt.value))
                  );
                  setTempSelectedExisting(selected);
                }}
              />
            </div>

            <div className="grid gap-1">
              <p className="text-xs opacity-70">Type</p>
              <MultiSelect
                value={tempSelectedType.map((opt) => String(opt.value))}
                options={roadTypeOptions.map((opt) => ({
                  label: opt.value ?? opt.id ?? String(opt.value),
                  value: String(opt.value),
                }))}
                onValueChange={(values: string[]) => {
                  const selected = roadTypeOptions.filter((opt) =>
                    values.includes(String(opt.value))
                  );
                  setTempSelectedType(selected);
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Apply Filters</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
