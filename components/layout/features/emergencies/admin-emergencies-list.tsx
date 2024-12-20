import { LayoutView } from "@/components/layout/layout-view";
import { Emergency } from "@prisma/client";
import { User } from "next-auth";
import { DataTable } from "@/app/(layout)/emergencies/_components/data-table";
import { AdminColumns } from "@/app/(layout)/emergencies/_components/columns";
import { getAllEmergencies } from "@/data/emergency";

export interface EmergencyData extends Emergency {
  user: User
}

export const AdminEmergencies = async () => {
  const data = await getAllEmergencies();
  return (
    <LayoutView title="All Emergencies">
      <DataTable data={data} columns={AdminColumns} />
    </LayoutView>
  );
  
}

