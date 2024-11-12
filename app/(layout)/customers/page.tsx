import fs from "fs";
import path from "path";
import { columns } from "./columns";
import { DataTable } from "@/app/(layout)/customers/data-table";

async function getData() {
  const filePath = path.join(
    process.cwd(),
    "app/(layout)/customers/",
    "data.json"
  );
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export default async function DemoPage() {
  const data = await getData();
  console.log("data", data);

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your expenses for this month!
        </p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
