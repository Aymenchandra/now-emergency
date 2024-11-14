"use server"
import { getUserById } from "@/data/user";
import { Profile } from "../layout/profile";


export const EditUserForm = async ({ id }: { id: string }) => {
  const user = getUserById(id) as any
  return (
    <div>
      <Profile editUser={user} />
    </div>
  );
}
