import ViewLocationButton from "@/components/atoms/view-location-button";
import DeleteRoadButton from "@/components/molecules/delete-road-button";

import type { ColumnDef } from "@tanstack/react-table";

export type RoadTable = {
  id: number;
  name: string;
  location: string;
  condition: string;
};

export const roadTableColumns: ColumnDef<RoadTable>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const token = localStorage.getItem("token");
      return (
        <div className="w-full mx-auto flex flex-row gap-4 justify-end">
          <DeleteRoadButton token={token as string} id={row.original.id} />
          <ViewLocationButton token={token as string} id={row.original.id} />
        </div>
      );
    },
  },
];
