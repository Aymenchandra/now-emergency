"use client"

import * as React from "react"
import {
  BriefcaseBusiness,
  Flag,
  Info,
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
import { useCurrentUser } from "@/hooks/use-current-user"
import { userRole } from "@prisma/client"

const data = {
  adminNav: [
    {
      title: "Server",
      url: "/server",
      icon: Sparkles,
    },
    {
      title: "Emergencies",
      url: "/emergencies",
      icon: Flag,
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
  ],
  userNav: [
    {
      title: "Emergencies",
      url: "/emergencies",
      icon: Flag,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ],
  employeeNav: [
    {
      title: "Assistances",
      url: "/assistances",
      icon: Info,
    },
    {
      title: "Emergencies",
      url: "/emergencies",
      icon: Flag,
    },
    {
      title: "WorkStation",
      url: "/workstation",
      icon: BriefcaseBusiness,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useCurrentUser()
  let navMain
  switch(user?.role) {
    case userRole.ADMIN:
      navMain = data.adminNav
      break;
    case userRole.USER:
      navMain = data.userNav
      break;
    case userRole.EMPLOYEE:
      navMain = data.employeeNav
      break;
    default:
      return
  }
  return (
    <Sidebar className="border-r-0" {...props}>
      <div className="flex justify-center items-center pt-2">
        <Image src="/logo.png" width={150} height={150} alt="logo not found" priority={true}/>
      </div>
      <SidebarHeader>
        <SidebarGroupLabel>Explore</SidebarGroupLabel>
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
