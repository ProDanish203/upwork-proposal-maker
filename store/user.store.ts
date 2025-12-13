import { MinimalUser } from "@/types";
import { create } from "zustand";

interface UserStore {
  user?: MinimalUser;
  setUser: (user: MinimalUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: MinimalUser) => set({ user }),
  clearUser: () => set({ user: undefined }),
}));
