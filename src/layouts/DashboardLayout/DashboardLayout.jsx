"use client";
import { useState } from "react";
import {
  ChevronDown,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings,
  Wallet,
  Wrench,
  LogOut,
  EllipsisVertical,
  BellDot,
  FishSymbol,
} from "lucide-react";



import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      { id: "Top gainer", title: "Top gainer", url: "#" },
      { id: "Top loser", title: "Top loser", url: "#" },
      { id: "Heap map", title: "Heap map", url: "#", isActive: true },
      { id: "billing", title: "Billing", url: "#" },
    ],
  },
  {
    id: "Deepsea",
    title: "Deepsea",
    icon: FishSymbol,
    url: "#",
    submenu: [
      { id: "all-users", title: "All Users", url: "#" },
      { id: "add-user", title: "Add New User", url: "#" },
      { id: "user-groups", title: "User Groups", url: "#" },
      { id: "permissions", title: "Permissions", url: "#" },
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
];

export function DashboardLayout({ children }) {
  // Track which dropdown menus are open
  const [openMenus, setOpenMenus] = useState({
    // Pre-open the menu with the active item
    asset: true,
  });

  // Toggle a specific dropdown menu
  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

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
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <div className="ml-2 text-lg font-semibold">Content Area</div>
          <div className="flex items-center gap-1">
            <div className="cursor-pointer rounded-md p-2 flex justify-center items-center text-[var(--primary)] hover:bg-muted/50">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <BellDot />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notification</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="cursor-pointer rounded-md p-2 hover:bg-muted/50">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="cursor-pointer rounded-md p-2 hover:bg-muted/50">
              <EllipsisVertical />
            </div>
          </div>
        </header>
        <div className="h-full flex-1 overflow-auto px-4 py-2">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
