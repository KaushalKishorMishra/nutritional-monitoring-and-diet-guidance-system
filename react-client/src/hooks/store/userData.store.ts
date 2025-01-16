import { create } from "zustand";

interface TUserData {
    name: string;
    userId: string;
    email: string;
    role: string;
    token: string;
}

interface TUserDataState extends TUserData {
    loggedIn: boolean;
    setUserData: (userData: TUserData) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    clearUserData: () => void;
}

const useUserDataStore = create<TUserDataState>((set) => ({
    name: "",
    userId: "",
    email: "",
    role: "",
    token: "",
    loggedIn: false,
    setUserData: (userData) =>
        set((state) => ({ ...state, ...userData })),
    setLoggedIn: (loggedIn) => set((state) => ({ ...state, loggedIn })),
    clearUserData: () => set({ name: "", userId: "", email: "", role: "", token: "", loggedIn: false }),
}));

export default useUserDataStore;
