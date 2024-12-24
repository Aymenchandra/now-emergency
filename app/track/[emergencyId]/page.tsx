
import DynamicRoutingMap from "@/components/map/RoutingMap/dynamicRoutingMap"
import { getTrackedEmergencyById } from "@/data/emergency"
import { LatLngTuple } from "leaflet"
import Link from "next/link"


const trackPage = async ({ params }: { params: { emergencyId: string } }) => {
  const emergency = await getTrackedEmergencyById(params.emergencyId)
  const emergencyTrackedPosition = {emergencyPosition : emergency?.position as number[], employeePosition: emergency?.employee?.location?.position as number[]}
  if (!emergency) {
    return <div>
      no data available... <Link href="/emergencies">back to the list</Link>
    </div>
  }
  return (
    <DynamicRoutingMap emergencyPosition={emergencyTrackedPosition}/>
  )
}

export default trackPage