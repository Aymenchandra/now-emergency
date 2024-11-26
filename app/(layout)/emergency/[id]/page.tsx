
import { Emergency } from "@/components/layout/features/emergency"
import { Toaster } from "@/components/ui/sonner"
import { getEmergencyById } from "@/data/emergency"


const emergencyPage = async ({ params }: { params: { id: string } }) => {
  const emergency = await getEmergencyById(params.id)
  if (!emergency) {
    return <div>
      no data available...
    </div>
  }
  return (
    <>
      <Toaster />
      <Emergency emergency={emergency} />
    </>
  )
}

export default emergencyPage