"use client"

import * as React from "react"
import {
  Siren,
  Sparkles,
  User,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/layout/shared/nav-main"
import {
  Sidebar,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  navMain: [
    // {
    //   title: "Client",
    //   url: "/client",
    //   icon: Search,
    // },
    {
      title: "Server",
      url: "/server",
      icon: Sparkles,
    },
    {
      title: "Emergency",
      url: "/emergency",
      icon: Siren,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
    // {
    //   title: "Inbox",
    //   url: "#",
    //   icon: Inbox,
    //   badge: "10",
    // },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar className="border-r-0" {...props}>
      <div className="flex justify-center items-center pt-2">
        <Image src="/logo.png" width={150} height={150} alt="logo not found" priority={true}/>
      </div>
      <SidebarHeader>
        <SidebarGroupLabel>Explore</SidebarGroupLabel>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
