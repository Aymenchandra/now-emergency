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
import { useEffect, useState } from "react";
import { Handshake, MoreHorizontal, Podcast } from "lucide-react";
import IconMenu from "@/components/icon-menu";
import { ResponsiveDialog } from "@/components/responsive-dialog";

import { AssignResponderForm } from "@/components/layout/crud-forms/assistances/assign-responder-form";
import { db } from "@/lib/db";
import { getEmergencyById } from "@/data/emergency";

interface RowData<T> {
  id: string;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends RowData<string>>({
  row
}: DataTableRowActionsProps<TData>) {
  const [isAssignResponderOpen, setIsAssignResponderOpen] = useState(false);
  const [isTrackEmergencyOpen, setIsTrackEmergencyOpen] = useState(false);
  const [employeeExists, setEmployeeExists] = useState<boolean | null>(null);


  useEffect(() => {

    const fetchEmergency = async () => {
      const emergency = await getEmergencyById(row.original.id);
      setEmployeeExists(!!emergency?.employeeId);

    };
    fetchEmergency();
  }, [row]);

  const handleAssignResponderOpen = () => {
    setIsAssignResponderOpen(true);
  };

  // Function to handle opening the track emergency modal
  const handleTrackEmergencyOpen = () => {
    setIsTrackEmergencyOpen(true);
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
              onClick={employeeExists ? handleTrackEmergencyOpen : handleAssignResponderOpen}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu
                text={employeeExists ? 'Track' : 'Responder'}
                icon={employeeExists ? <Podcast className="h-4 w-4" /> : <Handshake className="h-4 w-4" />}
              />
            </button>
          </DropdownMenuItem>


        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}