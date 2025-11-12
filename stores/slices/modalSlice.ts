import { StateCreator } from "zustand";

export type ModalSliceType = {
  isRegisterMatchOpen: boolean;
  openRegisterMatch: () => void;
  closeRegisterMatch: () => void;
};

export const createModalSlice: StateCreator<ModalSliceType> = (set) => ({
  isRegisterMatchOpen: false,
  openRegisterMatch: () => set({ isRegisterMatchOpen: true }),
  closeRegisterMatch: () => set({ isRegisterMatchOpen: false }),
});
