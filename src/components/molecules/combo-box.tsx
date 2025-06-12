import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { PlaceValueProps } from "@/lib/region-type";

type ComboboxProps = {
  name?: string;
  properties: PlaceValueProps[];
  onChange?: (selected: PlaceValueProps) => void;
  selectedId?: number;
  isDisable?: boolean;
};

export function Combobox({
  name = "Select...",
  properties,
  onChange,
  selectedId,
  isDisable,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (selectedId) {
      const selected = properties.find((item) => item.id === selectedId);
      if (selected) {
        setValue(selected.value);
      }
    }
  }, [selectedId, properties]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isDisable}
          variant={isDisable ? "secondary" : "outline"}
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between ${
            value ? "text-white" : "opacity-60"
          }`}
        >
          {value ? value : name}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {properties.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.value}
                  onSelect={() => {
                    const newValue =
                      framework.value === value ? "" : framework.value;
                    setValue(newValue);
                    setOpen(false);

                    const selectedItem = properties.find(
                      (prop) => prop.value === newValue
                    );
                    if (selectedItem && onChange) {
                      onChange(selectedItem);
                    }
                  }}
                >
                  {framework.value}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
