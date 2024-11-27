import { AdminEmergencies } from "@/components/layout/features/emergencies/admin-emergencies-list"
import { UserEmergencies } from "@/components/layout/features/emergencies/user-emergencies-list"
import { CurrentUser } from "@/lib/auth"
import { userRole } from "@prisma/client"


const usersPage = async () => {
  const user = await CurrentUser()
  
  switch (user?.role) {
    case userRole.ADMIN:
      return (
        <AdminEmergencies/>
      )
      break;
    case userRole.USER:
      return (
        <UserEmergencies/>
      )
      break;
    default:
      return []
  }
}

export default usersPage