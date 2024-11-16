"use client"
import { Settings } from "@/components/layout/features/settings"
import { useCurrentUser } from "@/hooks/use-current-user"

const clientPage = () => {
  const user = useCurrentUser()
  
  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <Settings label="client component" user={user}/>
    </div>
  )
}

export default clientPage