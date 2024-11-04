import type { Metadata } from "next";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { NavActions } from "@/components/nav-actions";
import { Card } from "@/components/ui/card";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


export const metadata: Metadata = {
  title: "Dasbhoard",
  description: "Dashboard",
};

export default async function dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session} >

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      Project Management & Task Tracking
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto px-3">
              <NavActions />
            </div>
          </header>
          <div className="flex flex-1 flex-col px-4 py-6 bg-slate-300">
            <div className="max-w-screen-2xl">
              <div className="mx-auto max-w-242.5">
                <Card className="rounded-sm border border">
                  <div className="px-4 pb-6 lg:pb-8 xl:pb-11.5">
                    {children}
                  </div>
                </Card>
              </div>
            </div>
          </div>

        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>

  );
}
