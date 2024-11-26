
import DynamicMap from "@/components/map/dynamicMap";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Emergency } from "@/components/layout/features/emergencies";

interface EmergencyProps {
  emergency?: Emergency;
};

const EmergencyPage = async ({emergency} : EmergencyProps) => {
  const session = await auth();

  return (

    <SessionProvider session={session} >
      <SidebarProvider>
        <Toaster />
        <DynamicMap emergency={emergency}/>
      </SidebarProvider>
    </SessionProvider>
  )
}

export default EmergencyPage