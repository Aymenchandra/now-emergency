"use client"

import DynamicMap from "@/components/map/dynamicMap"
import { useCurrentUser } from "@/hooks/use-current-user";
import { Toaster } from "@/components/ui/sonner"

export const Workstation = () => {
  const location = useCurrentUser()?.location;
  const phone = useCurrentUser()?.phone;
  const upDateUserWorkStation = {location,phone}
  return (
    <>
            <Toaster />
            <DynamicMap upDateUserWorkStation={upDateUserWorkStation}  />
    </>
  )
}