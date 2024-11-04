import { Profile } from "@/app/(protected)/_components/profile"
import { CurrentUser } from "@/lib/auth"

const serverPage = async () => {
  const user = await CurrentUser()
  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <Profile label="server component" user={user}/>
    </div>
  )
}

export default serverPage