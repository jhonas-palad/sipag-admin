import { columns } from "./columns";
import { DataTable } from "./UsersDataTable";
import { Label } from "@/components/ui/label";
import { ViewGridIcon, ListBulletIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { getUserList } from "@/lib/server/users";

export default async function UsersPage() {
  const data = await getUserList();

  return (
    <main className="">
      {/* <div className="mx-32 mt-6"></div> */}
      <div className="mx-32 py-10">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold text-neutral-700">
            List of masipag na tao
          </Label>
          <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <ListBulletIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <ViewGridIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="mt-4 w-full">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
