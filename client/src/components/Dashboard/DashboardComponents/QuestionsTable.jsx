"use client";

import * as React from "react";
import {
  // ColumnDef,
  // ColumnFiltersState,
  // SortingState,
  // VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

// const data: Payment[] = [
const data = [
  {
    username: "Marena",
    email: "mbroadhead0@zdnet.com",
    "Quizes Taken": 4,
    Passed: 9,
    Failed: 10,
  },
  {
    username: "Jacquette",
    email: "jbuttery1@technorati.com",
    "Quizes Taken": 1,
    Passed: 3,
    Failed: 8,
  },
  {
    username: "Camey",
    email: "cgiovanitti2@disqus.com",
    "Quizes Taken": 7,
    Passed: 5,
    Failed: 4,
  },
  {
    username: "Radcliffe",
    email: "rdrover3@google.de",
    "Quizes Taken": 8,
    Passed: 10,
    Failed: 1,
  },
  {
    username: "Sayer",
    email: "sdeyes4@simplemachines.org",
    "Quizes Taken": 8,
    Passed: 6,
    Failed: 5,
  },
  {
    username: "Karyn",
    email: "kbarchrameev5@123-reg.co.uk",
    "Quizes Taken": 1,
    Passed: 9,
    Failed: 2,
  },
  {
    username: "Alaster",
    email: "amcsperron6@unesco.org",
    "Quizes Taken": 9,
    Passed: 3,
    Failed: 7,
  },
  {
    username: "Trude",
    email: "tewestace7@tinypic.com",
    "Quizes Taken": 6,
    Passed: 7,
    Failed: 6,
  },
  {
    username: "Sidnee",
    email: "shaggath8@google.co.jp",
    "Quizes Taken": 10,
    Passed: 3,
    Failed: 8,
  },
  {
    username: "Bil",
    email: "btunkin9@wikipedia.org",
    "Quizes Taken": 3,
    Passed: 1,
    Failed: 1,
  },
  {
    username: "Ward",
    email: "wtrehearnea@craigslist.org",
    "Quizes Taken": 9,
    Passed: 9,
    Failed: 4,
  },
  {
    username: "Dud",
    email: "dhaineb@meetup.com",
    "Quizes Taken": 1,
    Passed: 8,
    Failed: 1,
  },
  {
    username: "Delcina",
    email: "darnaudc@symantec.com",
    "Quizes Taken": 3,
    Passed: 5,
    Failed: 7,
  },
  {
    username: "Homerus",
    email: "hthursfieldd@nba.com",
    "Quizes Taken": 9,
    Passed: 8,
    Failed: 2,
  },
  {
    username: "Bronnie",
    email: "babyse@goo.gl",
    "Quizes Taken": 6,
    Passed: 2,
    Failed: 6,
  },
  {
    username: "Benito",
    email: "bfoggartyf@diigo.com",
    "Quizes Taken": 4,
    Passed: 4,
    Failed: 6,
  },
  {
    username: "Pinchas",
    email: "pspinasg@odnoklassniki.ru",
    "Quizes Taken": 6,
    Passed: 4,
    Failed: 4,
  },
  {
    username: "Doloritas",
    email: "doiseauh@independent.co.uk",
    "Quizes Taken": 1,
    Passed: 6,
    Failed: 5,
  },
  {
    username: "Gawen",
    email: "gtopi@dot.gov",
    "Quizes Taken": 4,
    Passed: 4,
    Failed: 9,
  },
  {
    username: "Curry",
    email: "cwoodesonj@w3.org",
    "Quizes Taken": 7,
    Passed: 1,
    Failed: 6,
  },
];

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "Quizes Taken",
    header: () => <div className="text-right">Quizes Taken</div>,
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("Quizes Taken"));

      // // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount);

      return (
        <div className="text-right font-medium">
          {row.getValue("Quizes Taken")}
        </div>
      );
    },
  },
  {
    accessorKey: "Passed",
    header: () => <div className="text-right">Passed</div>,
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("Quizes Taken"));

      // // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount);

      return (
        <div className="text-right font-medium">{row.getValue("Passed")}</div>
      );
    },
  },
  {
    accessorKey: "Failed",
    header: () => <div className="text-right">Failed</div>,
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("Quizes Taken"));

      // // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount);

      return (
        <div className="text-right font-medium">{row.getValue("Failed")}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              {/* Delete User */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()} // Prevent closing dropdown
                  >
                    Delete User
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the user and their data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {/* Delete User */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View User detail</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function QuestionsTable() {
  // const [sorting, setSorting] = React.useState < SortingState > [];
  // const [columnFilters, setColumnFilters] =
  //   React.useState < ColumnFiltersState > [];
  // const [columnVisibility, setColumnVisibility] =
  //   React.useState < VisibilityState > {};
  // const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full text-slate-400">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  );
}
export default QuestionsTable;
