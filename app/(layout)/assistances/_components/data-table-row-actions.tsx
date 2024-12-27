"use client";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Handshake, MapPinCheckInside, MoreHorizontal, Podcast } from "lucide-react";
import IconMenu from "@/components/icon-menu";
import { ResponsiveDialog } from "@/components/responsive-dialog";

import { AssignResponderForm } from "@/components/layout/crud-forms/assistances/assign-responder-form";

import { useRouter } from 'next/navigation'
import { AssistanceDoneForm } from "@/components/layout/crud-forms/assistances/assitances-done";
import { emergencyStatus } from "@prisma/client";

interface RowData<T> {
  id: string;
  employeeId: string;
  status: emergencyStatus
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData extends RowData<string> ? TData : any>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const [isAssignResponderOpen, setIsAssignResponderOpen] = useState(false);
  const [isEmergencyDoneOpen, setIsEmergencyDoneOpen] = useState(false);
  const router = useRouter()


  const handleAssignResponderOpen = () => {
    setIsAssignResponderOpen(true);
  };

  const handleTrackEmergencyOpen = (emergencyId: string) => {
    router.push(`/track/${emergencyId}`)
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isAssignResponderOpen}
        setIsOpen={setIsAssignResponderOpen}
        title="Response Emergency"
        description="Are you sure you want to responde to this emergency?"
      >
        <AssignResponderForm id={row.original.id} setIsOpen={setIsAssignResponderOpen} />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isEmergencyDoneOpen}
        setIsOpen={setIsEmergencyDoneOpen}
        title="Emergency Done"
        description="Are you sure you want to close this emergency?"
      >
        <AssistanceDoneForm id={row.original.id} setIsOpen={setIsEmergencyDoneOpen} />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem
            className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500"
          >
            <button
              onClick={() => row.original.employeeId ? handleTrackEmergencyOpen(row.original.id) : handleAssignResponderOpen()}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              {/* row.original.employeeId == employeeExists */}
              <IconMenu
                text={row.original.employeeId ? 'Track' : 'Responder'}
                icon={row.original.employeeId ? <Podcast className="h-4 w-4" /> : <Handshake className="h-4 w-4" />}
              />
            </button>
          </DropdownMenuItem>
          {row.original.status != emergencyStatus.DONE && row.original.employeeId && (
            <DropdownMenuItem
              className="group flex w-full items-center justify-between text-left p-0 text-sm font-base text-neutral-500"
            >
              <button
                onClick={() => {
                  setIsEmergencyDoneOpen(true);
                }}
                className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
              >
                <IconMenu
                  text='Done'
                  icon={<MapPinCheckInside className="h-4 w-4" />}
                />
              </button>
            </DropdownMenuItem>
          )}

        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}