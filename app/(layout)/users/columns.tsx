"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Users } from "@/schemas/data-table-user-schema";
import { DataTableColumnHeader } from "@/components/data-table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Users>[] = [
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
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[150px] truncate flex items-center">
            <Image className="w-10 h-10 rounded-full" src={row.getValue("image") || "/default-avatar.png"} width={200} height={200} alt="avatar not found" />
            <div className="px-2 space-y-1">
              <div>{row.getValue("name")}</div>
              <Badge variant={row.getValue("role") === "USER" ? "default" : "golden"}>
                {row.getValue("role")}
              </Badge>
            </div>
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("email")}
          </span>
        </div>
      );
    }
  },
  // We don't need to define them as columns, so we declare them here and call them up in the other column, 
  // which in this case is the "name" column.
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" className="sr-only" /> // sr-only is required to hide column title
    ),
    cell: () => {
      return (
        <div className="sr-only"></div> // sr-only is required to hide column value
      );
    },
    enableHiding: false,
    enableSorting: false
  },
  // this too
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" className="sr-only" /> // sr-only is required to hide column title
    ),
    cell: () => {
      return (
        <div className="sr-only"></div> // sr-only is required to hide column value
      );
    },
    enableHiding: false,
    enableSorting: false
  },

  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EmailVerified" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("emailVerified"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];