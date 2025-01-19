import { ReactNode } from "react";
import { create } from "zustand";

type ModalType = "center" | "bottom"; // Two types of modals

interface ModalState {
    level: number; // Tracks the modal depth
    modals: Record<
        string,
        { visible: boolean; children: ReactNode; padding: boolean | null; type: ModalType }
    >; // Modal state storage
    openModal: (
        key: string,
        children: ReactNode,
        type: ModalType,
        padding?: boolean
    ) => void; // Open a modal
    closeModal: (key: string, remove?: boolean) => void; // Close a modal, optionally remove it
    clearAllModals: () => void; // Clear all modals
}

export const useModalStore = create<ModalState>((set) => ({
    level: 0,
    modals: {},
    openModal: (key: string, children: ReactNode, type: ModalType, padding = true) =>
        set((state) => ({
            level: state.level + 1,
            modals: {
                ...state.modals,
                [key]: { visible: true, children, type, padding },
            },
        })),
    closeModal: (key: string, remove = false) =>
        set((state) => {
            const updatedModals = { ...state.modals };

            if (remove) {
                delete updatedModals[key];
            } else if (updatedModals[key]) {
                updatedModals[key].visible = false;
            }

            const anyModalsOpen = Object.values(updatedModals).some(
                (modal) => modal.visible
            );

            return {
                modals: updatedModals,
                level: anyModalsOpen ? state.level - 1 : 0,
            };
        }),
    clearAllModals: () =>
        set(() => ({
            level: 0,
            modals: {},
        })),
}));
