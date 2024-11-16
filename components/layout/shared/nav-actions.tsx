"use client"

import * as React from "react"
import {
  ScreenShareOff,
  Settings2,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useCurrentUser } from "@/hooks/use-current-user"
import Image from "next/image"
import { logout } from "@/actions/auth/logout"
import { useRouter } from "next/navigation"

const data = [
  [
    {
      label: "Profile",
      icon: Settings2,
      url: '/profile'
    },
  ],
  [
    {
      label: "Disconnect",
      icon: ScreenShareOff,
      url: '/auth/login'
    },
  ],
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()
  const user = useCurrentUser()

  const avatarAction = async (url: string) => {
    if (url == '/auth/login') {
      await logout()
      return
    }
    router.push(url)
    setIsOpen(false)
  }
  React.useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
        {/* {user?.email} */}
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star />
      </Button>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
          >
            <img className="w-10 h-10 rounded-full" src={user?.image || "/default-avatar.png"} alt="avatar not found" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              <div className="flex items-center gap-4 p-4">
                <Image className="w-10 h-10 rounded-full" src={user?.image || "/default-avatar.png"} width={200} height={200} alt="avatar not found" />
                <div className="font-medium dark:text-white">
                  <div>{user?.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{user?.role.toLowerCase()}</div>
                </div>
              </div>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton onClick={() => avatarAction(item.url)}>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>

    </div>
  )
}
