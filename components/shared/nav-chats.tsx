"use client";

import { MoreHorizontal, Pen, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteChat, getAllChats } from "@/API/chat.api";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { toast } from "sonner";
import { useDialogsStore } from "@/store/dialogs.store";
import { RenameChatDialog } from "../helpers/rename-chat";
import { Chat } from "@/types";

export const NavChats = () => {
  const { isMobile } = useSidebar();
  const queryClient = useQueryClient();
  const { setRenameDialogOpen, setRenameChatId, setRenameChatTitle } =
    useDialogsStore();

  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const { response, success } = await getAllChats();
      if (!success) return [];
      return response;
    },
  });

  const { mutateAsync: deleteChatMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteChat,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      },
    });

  const handleChatDelete = async (chatId: string) => {
    const { response, success } = await deleteChatMutation(chatId);
    if (!success)
      return toast.error(
        typeof response === "string" ? response : "Failed to delete chat"
      );
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <RenameChatDialog />
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading ? (
          <div className="flex flex-col gap-y-2">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-8 bg-sidebar-accent text-sidebar-accent-foreground"
              />
            ))}
          </div>
        ) : chats && chats.length > 0 ? (
          chats.map((chat: Chat) => (
            <SidebarMenuItem key={chat._id}>
              <SidebarMenuButton asChild>
                <Link href={`/chat/${chat._id}`}>
                  <span>{chat.title}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem
                    onClick={() => {
                      setRenameChatId(chat._id);
                      setRenameChatTitle(chat.title);
                      setRenameDialogOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <Pen className="text-muted-foreground" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleChatDelete(chat._id)}
                    variant="destructive"
                    className="cursor-pointer"
                    disabled={isDeleting}
                  >
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))
        ) : (
          <div></div>
        )}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
