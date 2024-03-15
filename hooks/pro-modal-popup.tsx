import {create} from "zustand";

interface useProModalPopupProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useProModalPopup = create<useProModalPopupProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))