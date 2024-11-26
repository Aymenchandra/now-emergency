import DynamicMap from "@/components/map/dynamicMap"
import { Report } from "./reports";

interface EmergencyProps{
  emergency ?: Report;
};

export const Emergency = ({emergency} : EmergencyProps) => {

  return (
    <>
      <DynamicMap emergency={emergency}/>
    </>
  )
}