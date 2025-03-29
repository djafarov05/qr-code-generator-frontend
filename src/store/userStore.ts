import { create } from 'zustand'

interface User {
    name: string;
    email: string;
}

interface UserState {
    token: string | null;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isUserLoggedIn: () => boolean;
}

export const useUserStore = create<UserState>((set) => ({
    token: sessionStorage.getItem('token'),
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')!) : null,

    login: (token: string) => {
        // пока захардкодим user
        const user = { name: "John Doe", email: "john@example.com" }; // placeholder for now
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        set({ token, user });
    },

    logout: () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        set({ token: null, user: null });
    },

    isUserLoggedIn: () => {
        return Boolean(sessionStorage.getItem('token'));
    }
}));
