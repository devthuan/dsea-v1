"use client"
import { useState } from "react"
import {
  ChevronDown,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings,
  Wallet,
  Wrench,
  LogOut
} from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Sample data for the sidebar menu
const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "#",
  },
  {
    id: "Asset",
    title: "Asset",
    icon: Wallet,
    url: "#",
    submenu: [
      { id: "all-users", title: "All Users", url: "#" },
      { id: "add-user", title: "Add New User", url: "#" },
      { id: "user-groups", title: "User Groups", url: "#" },
      { id: "permissions", title: "Permissions", url: "#" },
    ],
  },
  {
    id: "Deepsea",
    title: "Deepsea",
    icon: Settings,
    url: "#",
    submenu: [
      { id: "Top gainer", title: "Top gainer", url: "#" },
      { id: "Top loser", title: "Top loser", url: "#" },
      { id: "Heap map", title: "Heap map", url: "#", isActive: true },
      { id: "billing", title: "Billing", url: "#" },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    url: "#",
    submenu: [
      { id: "general", title: "General", url: "#" },
      { id: "security", title: "Security", url: "#" },
      { id: "notifications", title: "Notifications", url: "#", isActive: true },
      { id: "billing", title: "Billing", url: "#" },
    ],
  },
]

export function DashboardLayout() {
  // Track which dropdown menus are open
  const [openMenus, setOpenMenus] = useState({
    // Pre-open the menu with the active item
    asset: true,
  })

  // Toggle a specific dropdown menu
  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }))
  }

  return (
    <SidebarProvider className={"w-[99vw]"} defaultOpen={true}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild tooltip="Admin Panel">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Deep sea</span>
                    <span className="">v1.0.0</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) =>
                  item.submenu ? (
                    <Collapsible
                      key={item.id}
                      className="w-full group/collapsible"
                      open={openMenus[item.id]}
                      onOpenChange={() => toggleMenu(item.id)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                            <ChevronDown
                              className={`ml-auto size-4 transition-transform ${
                                openMenus[item.id] ? "rotate-180" : ""
                              }`}
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.id}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={subItem.isActive}
                                >
                                  <a href={subItem.url}>{subItem.title}</a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {/* <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Home">
                <a href="#">
                  <Home className="size-4" />
                  <span>Back to Home</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem> */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Settings"}>
                <a href={"#"}>
                  <Settings className="size-4" />
                  <span className="">Settings</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuButton asChild tooltip={"Settings"}>
                <a href={"#"}>
                  <Wrench className="size-4" />
                  <span className="">Support</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuButton asChild tooltip={"Settings"}>
                <a href={"#"}>
                  <LogOut className="size-4" />
                  <span className="">LogOut</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className={"w-full"}>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-2 text-lg font-semibold">Content Area</div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
            <h2 className="text-2xl font-bold mb-4">Collapsible Sidebar</h2>
            <p className="mb-4">
              Click the menu button in the header to collapse/expand the
              sidebar. When collapsed, only icons will be shown.
            </p>
            <p className="mb-4">
              Hover over icons in collapsed mode to see tooltips with menu item
              names.
            </p>
            <p>You can also click and drag the sidebar edge to resize it.</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
