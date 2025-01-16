import { create } from "zustand";

interface TUserDataState {
    name: string;
}

const useUserDataStore = create<TUserDataState>((set) => ({
    name: "",
    setName: (name: string) => set({ name }),

}))

export default useUserDataStore;