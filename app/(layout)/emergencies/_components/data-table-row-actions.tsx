"use client";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { MoreHorizontal, Podcast, SquarePen, Trash2 } from "lucide-react";
import IconMenu from "@/components/icon-menu";
import { ResponsiveDialog } from "@/components/responsive-dialog";

import { useRouter } from "next/navigation";
import { DeleteForm } from "@/components/layout/crud-forms/delete-form";
import { layoutEntity } from "@/lib/layout-entity";

interface RowData<T> {
  id: string;
  employeeId: string | null;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function UsersDataTableRowActions<TData extends RowData<string>>({
  row
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Emergency"
        description="Are you sure you want to delete this emergency?"
      >
        <DeleteForm id={row.original.id} setIsOpen={setIsDeleteOpen} layout={layoutEntity.EMERGENCIES} />
      </ResponsiveDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          {!row.original.employeeId && (
            <>
              <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                <button
                  onClick={() => {
                    router.push(`/emergency/${row.original.id}`)
                  }}
                  className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                >
                  <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                <button
                  onClick={() => {
                    setIsDeleteOpen(true);
                  }}
                  className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                >
                  <IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
                </button>
              </DropdownMenuItem>
            </>
          )}
          {row.original.employeeId && (
            <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
              <button
                onClick={() => {
                  router.push(`/track/${row.original.id}`)
                }}
                className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
              >
                <IconMenu text="Track" icon={<Podcast className="h-4 w-4" />} />
              </button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export function AdminDataTableRowActions<TData extends RowData<string>>({
  row
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Emergency"
        description="Are you sure you want to delete this emergency?"
      >
        <DeleteForm id={row.original.id} setIsOpen={setIsDeleteOpen} layout={layoutEntity.EMERGENCIES} />
      </ResponsiveDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
        <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                router.push(`/track/${row.original.id}`)
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu text="Track" icon={<Podcast className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                router.push(`/emergency/${row.original.id}`)
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}