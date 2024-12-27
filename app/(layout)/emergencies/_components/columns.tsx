"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-components/data-table-column-header";
import { AdminDataTableRowActions, UsersDataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Emergency, emergencyStatus, emergencyType } from "@prisma/client";
import { EmergencyData } from "@/components/layout/features/emergencies/admin-emergencies-list";
import Image from "next/image";
import { useState } from "react";


// User columns display
export const UserColumns: ColumnDef<Emergency>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("title")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("description")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("country")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "governorate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Governorate" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("governorate")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            <Badge
              variant={
                row.getValue("type") === emergencyType.FIRE
                  ? "warning"
                  : row.getValue("type") === emergencyType.VIOLENCE
                    ? "destructive"
                    : "success"
              }
            >
              {row.getValue("type")}
            </Badge>
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            <Badge
              variant={
                row.getValue("status") === emergencyStatus.HELP
                  ? "warning"
                  : row.getValue("status") === emergencyStatus.PENDING
                    ? "destructive"
                    : "success"
              }
            >
              {row.getValue("status")}
            </Badge>
          </span>
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <UsersDataTableRowActions row={row as any} />,
  },
];


// admin columns display
export const AdminColumns: ColumnDef<EmergencyData>[] = [
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
    accessorFn: (row) => row.user?.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="w-[150px] truncate flex items-center">
          <Image className="w-10 h-10 rounded-full" src={row.getValue("image") || "/default-avatar.png"} width={200} height={200} alt="avatar not found" />
          <div className="px-2 space-y-1">
            <div>{row.getValue("name")}</div>
            <div>589503362</div>
          </div>
        </span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    accessorFn: (row) => row.user?.image,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" className="sr-only" />
    ),
    cell: ({ row }) => (
      <div className="sr-only"></div>
    ),
    enableHiding: false,
    enableSorting: false
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("title")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const [isTruncated, setIsTruncated] = useState(true);

      const toggleTruncation = () => {
        setIsTruncated((prev) => !prev);
      };

      return (
        <div className="flex space-x-2">
          {/* When clicked, toggle the truncation state */}
          <span
            onClick={toggleTruncation}
            className={`max-w-[300px] cursor-pointer ${isTruncated ? 'truncate' : ''}`}
          >
            {row.getValue("description")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("country")}, {row.getValue("governorate")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "governorate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" className="sr-only" />
    ),
    cell: ({ row }) => (
      <div className="sr-only"></div>
    ),
    enableHiding: false,
    enableSorting: false
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            <Badge
              variant={
                row.getValue("type") === emergencyType.FIRE
                  ? "warning"
                  : row.getValue("type") === emergencyType.VIOLENCE
                    ? "destructive"
                    : "success"
              }
            >
              {row.getValue("type")}
            </Badge>
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            <Badge
              variant={
                row.getValue("status") === emergencyStatus.HELP
                  ? "warning"
                  : row.getValue("status") === emergencyStatus.PENDING
                    ? "destructive"
                    : "success"
              }
            >
              {row.getValue("status")}
            </Badge>
          </span>
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <AdminDataTableRowActions row={row} />,
  },
];