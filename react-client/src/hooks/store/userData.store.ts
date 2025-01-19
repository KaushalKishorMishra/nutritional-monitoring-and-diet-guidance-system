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
    getUserData: () => TUserData;
    setLoggedIn: (loggedIn: boolean) => void;
    clearUserData: () => void;
}

const useUserDataStore = create<TUserDataState>()(
    persist(
        (set, get) => ({
            name: "",
            userId: "",
            email: "",
            role: "",
            token: "",
            loggedIn: false,
            setUserData: ({ name, userId, email, role, token }: TUserData) =>
                set(() => ({ name, userId, email, role, token, loggedIn: true })),
            getUserData: () => {
                const { name, userId, email, role, token } = get();
                return { name, userId, email, role, token };
            },
            setLoggedIn: (loggedIn?: boolean) =>
                set(() => ({
                    loggedIn: loggedIn !== undefined ? loggedIn : !get().loggedIn,
                })),
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
