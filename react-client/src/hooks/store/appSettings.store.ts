import { create } from "zustand";

export enum Theme {
    Light = "customLight",
    Dark = "customDark"
}

interface TAppSettingsState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const useAppSettingsStore = create<TAppSettingsState>((set) => ({
    theme: Theme.Light,
    setTheme: (theme: Theme) => set({ theme }),
}))

export default useAppSettingsStore