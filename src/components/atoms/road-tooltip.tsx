import type { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
  placeName: string;
  locationName: string;
  children: ReactNode;
}

export function RoadInfoTooltip({
  placeName,
  locationName,
  children,
}: CustomTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col hap-2">
          {placeName}
          {locationName}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
