import { columns } from "@/app/(layout)/users/columns";
import { DataTable } from "@/app/(layout)/users/data-table";
import { db } from "@/lib/db";


async function getData() {
  const data = db.user.findMany({
    select:{
      id:true,
      name:true,
      email:true,
      emailVerified:true,
      role:true,
      image:true,
    }
  })
  return data;
}

export const Users = async () => {
  const data: any[] = await getData();
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          users list
        </p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
  
}