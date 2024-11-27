import { columns } from "@/app/(layout)/emergencies/_components/columns";
import { DataTable } from "@/app/(layout)/emergencies/_components/data-table";
import { db } from "@/lib/db";
import { LayoutView } from "@/components/layout/layout-view";
import { Emergency, userRole } from "@prisma/client";
import { CurrentUser } from "@/lib/auth";
import { getEmergencyByUserId } from "@/data/user";



const getData = async (): Promise<Emergency[]> => {
  const user = await CurrentUser()
  switch(user?.role) {
    case userRole.ADMIN:
      return db.emergency.findMany();
      break;
    case userRole.USER:
      return getEmergencyByUserId(user.id as string)
      break;
    default:
      return []
  }
}

export const Emergencies = async () => {
  const data = await getData();
  return (
    <LayoutView title="All Emergencies">
      <DataTable data={data} columns={columns} />
    </LayoutView>
  );

}