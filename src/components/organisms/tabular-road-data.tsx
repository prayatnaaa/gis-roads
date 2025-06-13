import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  // type ColumnFiltersState,
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
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterButton?: React.ReactNode;
}

export function TabularRoadData({
  columns,
  data,
  filterButton,
}: DataTableProps<RoadTable, unknown>) {
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // );

  const selectedId = useLocationStore((state) => state.id);
  const pageSize = 5;
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  });

  React.useEffect(() => {
    const id = Number(selectedId);

    if (!id || data.length === 0) return;

    const rowIndex = data.findIndex((item) => item.id === id);

    if (rowIndex !== -1) {
      const pageIndex = Math.floor(rowIndex / pageSize);

      console.log(table.getState().pagination.pageIndex);
      console.log(pageIndex);

      if (table.getState().pagination.pageIndex !== pageIndex) {
        console.log(pageIndex);

        setTimeout(() => {
          table.setPageIndex(pageIndex);
        }, 0);
      } else {
        setTimeout(() => {
          table.setPageIndex(pageIndex);
        }, 0);
      }
    }
  }, [selectedId, data, pageSize, table]);

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

          <div className="flex gap-4 items-center">
            {filterButton}
            <AddRoadButton />
          </div>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={
                    String(row.original.id) === String(selectedId)
                      ? "bg-gray-800 text-white"
                      : ""
                  }
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-gray-200">
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
                  No roads available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
