import { createMatchSlice, MatchSliceType } from "@/app/matches/slices/matchSlice";
import { createModalSlice, ModalSliceType } from "./slices/modalSlice";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type useAppStoreType = MatchSliceType & ModalSliceType;

export const useAppStore = create<useAppStoreType>()(
  devtools(
    persist(
      (...a) => ({
        ...createMatchSlice(...a),
        ...createModalSlice(...a),
      }),
      {
        name: "metastriker-lab-v1", 
      }
    )
  )
);
