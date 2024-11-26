import { columns } from "@/app/(layout)/reports/_components/columns";
import { DataTable } from "@/app/(layout)/reports/_components/data-table";
import { db } from "@/lib/db";
import { LayoutView } from "@/components/layout/layout-view";
import { emergencyStatus, emergencyType } from "@prisma/client";

export type Report = {
  id: string
  title: string | null,
  description: string | null,
  country: string | null,
  governorate: string | null,
  position: number[],
  type: emergencyType,
  userId: string | null;
  status: emergencyStatus,
}

async function getData(): Promise<Report[]> {
  return db.emergency.findMany()
}

export const Reports = async () => {
  const data = await getData();
  return (
    <LayoutView title="All Reports">
      <DataTable data={data} columns={columns} />
    </LayoutView>
  );

}