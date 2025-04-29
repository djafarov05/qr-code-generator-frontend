import { create } from "zustand";

interface User {
  id: number;
  userName: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => {
  const saved = sessionStorage.getItem("user");
  return {
    user: saved ? JSON.parse(saved) : null,
    isLoggedIn: !!saved,

    login: (user) => {
      sessionStorage.setItem("user", JSON.stringify(user));
      set({ user, isLoggedIn: true });
    },

    logout: () => {
      sessionStorage.removeItem("user");
      set({ user: null, isLoggedIn: false });
    },
  };
});
