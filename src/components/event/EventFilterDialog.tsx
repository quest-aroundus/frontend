"use client";

import { useBodyScrollLockStore } from "@/stores/useBodyScrollLockStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { useEffect } from "react";
import BackgroundShade from "../common/BackgroundShade";
import EventFilterOptions from "./EventFilterOptions";
import { FilterType } from "@/types/event";
import { getApiParamsFromFilterOptions } from "@/utils/filter";
import { useRouter } from "next/navigation";

interface EventFilterDialogHeaderProps {
  onClose: () => void;
}

const EventFilterDialogHeader = ({ onClose }: EventFilterDialogHeaderProps) => {
  const router = useRouter();

  /** Filter Store */
  const { resetFilters } = useFilterStore();

  const handleReset = () => {
    resetFilters();
    router.replace(`?${new URLSearchParams().toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-row items-center justify-between w-full h-10 pt-2 sticky top-0 bg-white">
      <button className="text-main_b cursor-pointer" onClick={onClose}>
        Close
      </button>
      <h2 className="font-semibold">Filter</h2>
      <button className="text-main_b cursor-pointer" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

interface EventFilterDialogProps {
  isOpen: boolean | undefined;
  onClose: () => void;
}

const EventFilterDialog = ({ isOpen, onClose }: EventFilterDialogProps) => {
  /** Body Scroll Lock */
  const { lock, unlock } = useBodyScrollLockStore();
  const { _hasHydrated } = useFilterStore();

  useEffect(() => {
    if (isOpen) {
      lock();
    } else {
      unlock();
    }
  }, [isOpen, lock, unlock]);

  // 하이드레이션이 완료되지 않았다면 렌더링하지 않음
  if (!_hasHydrated) {
    return null;
  }

  return (
    <>
      <BackgroundShade isOpen={isOpen} onClose={onClose} />

      {/* Bottom Sheet */}
      <div
        className={`
        fixed bottom-0 left-0 right-0 z-50 h-[calc(100vh-3.75rem)] max-w-[35rem] mx-auto pb-4 px-5 bg-white rounded-t-[0.625rem] transition-all duration-500 overflow-y-auto no-scrollbar ${
          isOpen
            ? "slide-up"
            : isOpen === undefined
            ? "translate-y-full"
            : "slide-down"
        }
      `}
      >
        <EventFilterDialogHeader onClose={onClose} />
        <div className="flex flex-col gap-6 mt-5">
          {["date", "category", "scale", "radius"].map((type, index, arr) => (
            <EventFilterOptions
              key={type}
              type={type as FilterType}
              isLast={index === arr.length - 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventFilterDialog;
