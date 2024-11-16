import { columns } from "@/app/(layout)/users/_components/columns";
import { DataTable } from "@/app/(layout)/users/_components/data-table";
import { db } from "@/lib/db";
import { LayoutView } from "@/components/layout/layout-view";
import { userRole } from "@prisma/client";

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: userRole;
  isTwoFactorEnabled: boolean;
}

async function getData(): Promise <User[]> {
  return db.user.findMany()
}

export const Users = async () => {
  const data = await getData();
  return (
    <LayoutView title="All Users">
      <DataTable data={data} columns={columns} />
    </LayoutView>
  );
  
}