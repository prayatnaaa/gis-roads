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
  onChange,
}: {
  values: PlaceValueProps[] | undefined;
  label: string;
  onChange: (value: any) => void;
}) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {values?.map((item, index) => (
            <SelectItem value={String(item.id)} key={index} onChange={onChange}>
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
