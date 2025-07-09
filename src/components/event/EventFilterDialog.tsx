"use client";

import { useBodyScrollLockStore } from "@/stores/useBodyScrollLockStore";
import { useEffect } from "react";
import BackgroundShade from "../common/BackgroundShade";

interface EventFilterDialogProps {
  isOpen: boolean | undefined;
  onClose: () => void;
}

const EventFilterDialog = ({ isOpen, onClose }: EventFilterDialogProps) => {
  /** Body Scroll Lock */
  const { lock, unlock } = useBodyScrollLockStore();
  useEffect(() => {
    if (isOpen) {
      lock();
    } else {
      unlock();
    }
  }, [isOpen, lock, unlock]);

  return (
    <>
      <BackgroundShade isOpen={isOpen} onClose={onClose} />

      {/* Bottom Sheet */}
      <div
        className={`
        fixed bottom-0 left-0 right-0 z-50  h-[calc(100vh-3.75rem)] max-w-[35rem] mx-auto py-2 px-5 bg-white rounded-t-[0.625rem] transition-all duration-500 ${
          isOpen
            ? "slide-up"
            : isOpen === undefined
            ? "translate-y-full"
            : "slide-down"
        }
      `}
      >
        <div className="flex flex-col items-center justify-between">
          <button className="text-sm text-gray-500">초기화</button>
          <h2 className="text-lg font-bold">필터</h2>
          <button className="text-sm text-gray-500">적용</button>
        </div>
      </div>
    </>
  );
};

export default EventFilterDialog;
