import { columns } from "@/app/(layout)/users/_components/columns";
import { DataTable } from "@/app/(layout)/users/_components/data-table";
import { db } from "@/lib/db";
import { LayoutView } from "@/components/layout/layout-view";
import { User } from "@prisma/client";


const getData = async (): Promise<User[]> => {
  return db.user.findMany();
}
export const Users = async () => {
  const data = await getData();
  return (
    <LayoutView title="All Users">
      <DataTable data={data} columns={columns} />
    </LayoutView>
  );
  
}