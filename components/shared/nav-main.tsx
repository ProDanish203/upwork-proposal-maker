"use client";

import { Bot, House, Plus, User } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createChat } from "@/API/chat.api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

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
];

export function NavMain() {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleCreateChat = async () => {
    const { response, success } = await createChat();
    if (!success)
      return toast.error(
        typeof response === "string" ? response : "Failed to create chat"
      );
    toast.success("New chat created");
    queryClient.invalidateQueries({ queryKey: ["chats"] });
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={"New Chat"} onClick={handleCreateChat}>
            <Plus />
            <span>New Chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
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
