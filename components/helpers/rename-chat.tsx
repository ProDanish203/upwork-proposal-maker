import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateChat } from "@/API/chat.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDialogsStore } from "@/store/dialogs.store";
import { Loader } from "lucide-react";

export const RenameChatDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    renameChatId,
    renameChatTitle,
    renameDialogOpen,
    setRenameDialogOpen,
    setRenameChatId,
    setRenameChatTitle,
  } = useDialogsStore();

  const { mutateAsync: updateChatMutation, isPending } = useMutation({
    mutationFn: updateChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameChatTitle.trim() || !renameChatId) return;
    const { response, success } = await updateChatMutation({
      chatId: renameChatId,
      title: renameChatTitle,
    });

    if (!success)
      return toast.error(
        typeof response === "string" ? response : "Failed to rename chat"
      );
    else {
      setRenameDialogOpen(false);
      setRenameChatId(null);
      setRenameChatTitle("");
    }
  };

  const handleClose = () => {
    setRenameDialogOpen(false);
    setRenameChatId(null);
    setRenameChatTitle("");
  };

  return (
    <Dialog open={renameDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat</DialogTitle>
          <DialogDescription>
            Please enter a new name for your chat.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRename} className="mt-2">
          <Input
            value={renameChatTitle}
            onChange={(e) => setRenameChatTitle(e.target.value)}
            className="w-full max-sm:text-sm py-5"
          />

          <div className="flex items-center justify-end mt-6 gap-x-3">
            <Button
              onClick={handleClose}
              variant="secondary"
              className="cursor-pointer"
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer min-w-20"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Save</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
