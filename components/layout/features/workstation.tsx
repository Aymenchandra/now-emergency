"use client"

import DynamicMap from "@/components/map/dynamicMap"
import { useCurrentUser } from "@/hooks/use-current-user";
import { Toaster } from "@/components/ui/sonner"

export const Workstation = () => {
  const location = useCurrentUser()?.location;
  return (
    <>
            <Toaster />
            <DynamicMap location={location} />
    </>
  )
}