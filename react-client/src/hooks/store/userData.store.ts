import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TUserData {
    name: string;
    userId: string;
    email: string;
    role: string;
    token: string;
}

interface TUserDataState {
    name: string;
    userId: string;
    email: string;
    role: string;
    token: string;
    loggedIn: boolean;
    setUserData: (userData: TUserData) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    clearUserData: () => void;
}

const useUserDataStore = create<TUserDataState>()(
    persist(
        (set) => ({
            name: "",
            userId: "",
            email: "",
            role: "",
            token: "",
            loggedIn: false,
            setUserData: ({ name, userId, email, role, token }: TUserData) =>
                set(() => ({ name, userId, email, role, token, loggedIn: true })),
            setLoggedIn: (loggedIn) => set(() => ({ loggedIn })),
            clearUserData: () =>
                set(() => ({
                    name: "",
                    userId: "",
                    email: "",
                    role: "",
                    token: "",
                    loggedIn: false,
                })),
        }),
        {
            name: "user-data",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserDataStore;
