"use client"

import * as React from "react"
import {
  Home,
  Inbox,
  Search,
  Sparkles,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Client",
      url: "/client",
      icon: Search,
    },
    {
      title: "Server",
      url: "/server",
      icon: Sparkles,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
