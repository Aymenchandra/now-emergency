"use client"
import { Profile } from "@/app/(protected)/_components/profile"
import { useCurrentUser } from "@/hooks/use-current-user"

const clientPage = () => {
  const user = useCurrentUser()
  
  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <Profile label="client component" user={user}/>
    </div>
  )
}

export default clientPage