import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import React from "react";
import AddRoadButton from "../atoms/add-road-button";
import { useLocationStore } from "@/stores/map-location-stores";
import type { RoadTable } from "@/lib/road-table-columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TabularRoadData({
  columns,
  data,
}: DataTableProps<RoadTable, unknown>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const selectedId = useLocationStore((state) => state.id);

  const [visiblePageCount, setVisiblePageCount] = React.useState(1);
  const pageSize = 3;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    manualPagination: false,
  });

  const allRows = table.getFilteredRowModel().rows;
  const rowsToRender = allRows.slice(0, visiblePageCount * pageSize);
  const hasMore = allRows.length > rowsToRender.length;

  return (
    <div>
      <div className="container border rounded-md p-2">
        <div className="w-full sm:flex flex-row justify-between sm:mb-4">
          <Input
            placeholder="Filter locations..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <AddRoadButton />
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rowsToRender.length ? (
              rowsToRender.map((row) => (
                <TableRow
                  key={row.id}
                  className={`${
                    selectedId == String(row.original.id) ? "bg-gray-800" : ""
                  }`}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={`text-gray-200 `}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {hasMore && (
        <div className="flex justify-end text-sm mt-2 opacity-40 hover:opacity-90 hover:cursor-pointer">
          <div onClick={() => setVisiblePageCount((p) => p + 1)}>Load more</div>
        </div>
      )}
    </div>
  );
}
