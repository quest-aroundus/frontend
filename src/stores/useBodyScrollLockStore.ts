import { create } from "zustand";

type BodyScrollLockStore = {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
};

export const useBodyScrollLockStore = create<BodyScrollLockStore>((set) => ({
  isLocked: false,
  lock: () => {
    document.body.style.overflow = "hidden"; // 스크롤 막기
    set({ isLocked: true });
  },
  unlock: () => {
    document.body.style.overflow = ""; // 스크롤 복구
    set({ isLocked: false });
  },
}));
