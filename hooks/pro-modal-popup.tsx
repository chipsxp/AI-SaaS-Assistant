// 'create' lets you create a React Hook with API utilities attached

import { create } from "zustand";

// define the types for your state and actions to ensure type safety throughout your application.

interface useProModalPopupProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// 'create' is a function that takes a setState function and returns an object with a useProModalPopup hook.
// Most of the time, return an object with the methods you want to expose.

export const useProModalPopup = create<useProModalPopupProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
