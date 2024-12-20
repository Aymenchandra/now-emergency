import { columns } from "@/app/(layout)/assistances/_components/columns";
import { DataTable } from "@/app/(layout)/assistances/_components/data-table";
import { LayoutView } from "@/components/layout/layout-view";
import { getAllAssistancesByEmployee } from "@/data/emergency";


export const Assistances = async () => {
  const data = await getAllAssistancesByEmployee();
    return (
      <LayoutView title="All Assistances">
        <DataTable data={data} columns={columns} />
      </LayoutView>
    );
}