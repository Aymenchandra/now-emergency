import { Settings } from "@/components/layout/features/settings"
import { CurrentUser } from "@/lib/auth"

const serverPage = async () => {
  const user = await CurrentUser()
  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <Settings label="server component" user={user}/>
    </div>
  )
}

export default serverPage