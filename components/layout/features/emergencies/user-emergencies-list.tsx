import { LayoutView } from "@/components/layout/layout-view";
import { CurrentUser } from "@/lib/auth";
import { getEmergencyByUserId } from "@/data/user";
import { DataTable } from "@/app/(layout)/emergencies/_components/data-table";
import { UserColumns } from "@/app/(layout)/emergencies/_components/columns";


export const UserEmergencies = async () => {
  const user = await CurrentUser()
  const data = await getEmergencyByUserId(user?.id as string);
  return (
    <LayoutView title="All Users">
      <DataTable data={data} columns={UserColumns} />
    </LayoutView>
  );
  
}

