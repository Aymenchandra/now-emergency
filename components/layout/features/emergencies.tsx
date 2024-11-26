import { columns } from "@/app/(layout)/emergencies/_components/columns";
import { DataTable } from "@/app/(layout)/emergencies/_components/data-table";
import { db } from "@/lib/db";
import { LayoutView } from "@/components/layout/layout-view";
import { Emergency } from "@prisma/client";



async function getData(): Promise<Emergency[]> {
  return db.emergency.findMany()
}

export const Emergencies = async () => {
  const data = await getData();
  return (
    <LayoutView title="All Emergencies">
      <DataTable data={data} columns={columns} />
    </LayoutView>
  );

}