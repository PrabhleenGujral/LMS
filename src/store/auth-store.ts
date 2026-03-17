import { create } from "zustand";
import { currentUser } from "@/lib/dummy-data";
import type { User } from "@/lib/dummy-data";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser, // Pre-logged in with dummy user
  isLoggedIn: true,

  login: (_email: string, _password: string) => {
    set({ user: currentUser, isLoggedIn: true });
    return true;
  },

  register: (name: string, email: string, _password: string) => {
    set({
      user: { ...currentUser, name, email },
      isLoggedIn: true,
    });
    return true;
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
  },
}));
