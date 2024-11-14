
import { Profile } from "@/components/layout/profile"
import { getUserById } from "@/data/user";


const userProfile = async ({ params }: { params: { userId: string } }) => {

  const user = await getUserById(params.userId) as any
  if(user.password === null) user.isOAuth = true
  return (
    <div>
      <Profile editUser={user} />
    </div>
  );
}

export default userProfile