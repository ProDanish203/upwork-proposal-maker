"use client";

import { Bot, House, User } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Models",
    url: "#",
    icon: Bot,
  },
];

export function NavMain() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {data.map((item, idx) => (
          <SidebarMenuItem key={idx}>
            <Link href={item.url}>
              <SidebarMenuButton
                tooltip={item.title}
                className={
                  pathname === item.url
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : ""
                }
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
