
import DynamicRoutingMap from "@/components/map/RoutingMap/dynamicRoutingMap"
import { getTrackedEmergencyById } from "@/data/emergency"
import { LatLngTuple } from "leaflet"
import Link from "next/link"


const trackPage = async ({ params }: { params: { emergencyId: string } }) => {
  const emergency = await getTrackedEmergencyById(params.emergencyId)
  const emergencyTrackedPosition = { emergencyLocation: emergency?.display_name as string, emergencyPosition: emergency?.position as number[], employeeLocation: emergency?.employee?.location?.country as string, employeePosition: emergency?.employee?.location?.position as number[] }
  if (!emergency) {
    return <div>
      no data available... <Link href="/emergencies">back to the list</Link>
    </div>
  }
  return (
    <DynamicRoutingMap trackedEmergency={emergencyTrackedPosition} />
  )
}

export default trackPage