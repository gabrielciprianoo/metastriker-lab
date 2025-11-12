import { createMatchSlice, MatchSliceType } from "@/app/matches/slices/matchSlice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createModalSlice, ModalSliceType } from "./slices/modalSlice";

type useAppStoreType = MatchSliceType &  ModalSliceType;  

export const useAppStore = create<useAppStoreType>()(
  devtools((...a) => ({
    ...createMatchSlice(...a),
    ...createModalSlice(...a)
  }))
);
