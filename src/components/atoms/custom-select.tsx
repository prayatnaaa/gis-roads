import type { PlaceValueProps } from "@/lib/region-type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CustomSelect = ({
  values,
  label,
  value,
  onChange,
}: {
  values: PlaceValueProps[] | undefined;
  label: string;
  value: PlaceValueProps | null;
  onChange: (value: PlaceValueProps | null) => void;
}) => {
  const handleChange = (val: string) => {
    const selected = values?.find((item) => String(item.id) === val) ?? null;
    onChange(selected);
  };

  return (
    <Select
      onValueChange={handleChange}
      value={value ? String(value.id) : undefined}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value="CLEAR">Clear</SelectItem>
          {values?.map((item) => (
            <SelectItem value={String(item.id)} key={item.id}>
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
