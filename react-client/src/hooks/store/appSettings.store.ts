import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum Theme {
    Light = "customLight",
    Dark = "customDark"
}

interface TAppSettingsState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const useAppSettingsStore = create<TAppSettingsState>()(
    persist(
        (set) => ({
            theme: Theme.Light,
            setTheme: (theme: Theme) => set(() => ({ theme })),
        }),
        {
            name: "app-settings", // Key for localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAppSettingsStore;
