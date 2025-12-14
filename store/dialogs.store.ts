import { create } from "zustand";

interface DialogsStore {
  // Rename Dialog
  renameChatId: string | null;
  setRenameChatId: (chatId: string | null) => void;
  renameChatTitle: string;
  setRenameChatTitle: (title: string) => void;
  renameDialogOpen: boolean;
  setRenameDialogOpen: (isOpen: boolean) => void;
}

export const useDialogsStore = create<DialogsStore>((set) => ({
  // Rename Dialog
  renameChatId: null,
  setRenameChatId: (chatId) => set({ renameChatId: chatId }),
  renameChatTitle: "",
  setRenameChatTitle: (title) => set({ renameChatTitle: title }),
  renameDialogOpen: false,
  setRenameDialogOpen: (isOpen) => set({ renameDialogOpen: isOpen }),
}));
