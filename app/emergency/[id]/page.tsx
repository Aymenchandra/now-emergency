
import { getEmergencyById } from "@/data/emergency"
import EmergencyPage from "../page"
import Link from "next/link"


const updateEmergencyPage = async ({ params }: { params: { id: string } }) => {
  const emergency = await getEmergencyById(params.id)
  if (!emergency) {
    return <div>
      no data available... <Link href="/emergencies">back to the list</Link>
    </div>
  }
  return (
    <EmergencyPage emergency={emergency}/>
  )
}

export default updateEmergencyPage