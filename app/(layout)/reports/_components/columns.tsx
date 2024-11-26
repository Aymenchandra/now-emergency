"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-components/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/components/layout/features/reports";
import { emergencyStatus, emergencyType } from "@prisma/client";

export const columns: ColumnDef<Report>[] = [
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
  // {
  //   accessorKey: "title",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Title" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="w-[150px] truncate flex items-center">
  //           <Image className="w-10 h-10 rounded-full" src={row.getValue("image") || "/default-avatar.png"} width={200} height={200} alt="avatar not found" />
  //           <div className="px-2 space-y-1">
  //             <div>{row.getValue("name")}</div>
  //             <Badge variant={row.getValue("role") === "USER" ? "default" : "golden"}>
  //               {row.getValue("role")}
  //             </Badge>
  //           </div>
  //         </span>
  //       </div>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  // We don't need to define them as columns, so we declare them here and call them up in the other column, 
  // which in this case is the "name" column.
  // {
  //   accessorKey: "role",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Role" className="sr-only" /> // sr-only is required to hide column title
  //   ),
  //   cell: () => {
  //     return (
  //       <div className="sr-only"></div> // sr-only is required to hide column value
  //     );
  //   },
  //   enableHiding: false,
  //   enableSorting: false
  // },
  // this too
  // {
  //   accessorKey: "image",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Image" className="sr-only" /> // sr-only is required to hide column title
  //   ),
  //   cell: () => {
  //     return (
  //       <div className="sr-only"></div> // sr-only is required to hide column value
  //     );
  //   },
  //   enableHiding: false,
  //   enableSorting: false
  // },

  // {
  //   accessorKey: "emailVerified",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="EmailVerified" />
  //   ),
  //   cell: ({ row }) => {
  //     const emailVerified = row.getValue("emailVerified")
  //     if (emailVerified === null) {
  //       return (
  //         <div className="flex w-[100px] items-center">
  //           <span className="capitalize">N/A</span> 
  //         </div>
  //       );
  //     }

  //     const date = new Date(emailVerified as string);
  //     const formattedDate = date.toLocaleDateString("en-US", {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     });
  //     return (
  //       <div className="flex w-[100px] items-center">
  //         <span className="capitalize">{formattedDate}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     const rowDate = new Date(row.getValue(id));
  //     const [startDate, endDate] = value;
  //     return rowDate >= startDate && rowDate <= endDate;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];