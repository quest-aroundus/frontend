import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  SelectedFilters,
  EventSearchParams,
  FilterType,
  EventSize,
  EventLocationRadius,
} from "@/types/event";
import { getDateRangeFromFilter } from "@/utils/date";
import {
  CATEGORY_DEFAULT_FILTER,
  DATE_FILTERS,
  EVENT_SIZE_FILTERS,
  LOCATION_RADIUS_FILTERS,
} from "@/constants/filters";

interface FilterState {
  // 상태
  filters: SelectedFilters;

  // 액션들
  setFilters: (filters: Partial<SelectedFilters>) => void;
  resetFilters: () => void;
  setSearch: (search: string) => void;

  // 유틸리티
  getSelectedValue: (type: FilterType) => string | number;
  getApiParams: () => EventSearchParams;
  hasActiveFilters: () => boolean;
}

const initialFilters: SelectedFilters = {
  search: undefined,
  date: DATE_FILTERS[0],
  scale: EVENT_SIZE_FILTERS[0],
  radius: LOCATION_RADIUS_FILTERS[0],
  category: CATEGORY_DEFAULT_FILTER,
};

export const useFilterStore = create<FilterState>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      filters: initialFilters,

      // 필터 관련 액션들
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      resetFilters: () =>
        set({
          filters: initialFilters,
        }),

      setSearch: (search) =>
        set((state) => ({
          filters: { ...state.filters, search },
        })),

      // 선택된 필터 값 가져오기
      getSelectedValue: (type: FilterType) => {
        const { filters } = get();
        const selectedFilter = filters[type as keyof SelectedFilters];
        return typeof selectedFilter === "object" ? selectedFilter.id : null;
      },

      // API 파라미터로 변환
      getApiParams: (): EventSearchParams => {
        const { filters } = get();
        const dateRange = getDateRangeFromFilter(filters.date?.value as string);
        return {
          search: filters.search || undefined,
          start_dt: dateRange.start || undefined,
          end_dt: dateRange.end || undefined,
          location_latitude: 0,
          location_longitude: 0,
          location_radius: filters.radius?.value as EventLocationRadius,
          event_size: (filters.scale?.value as EventSize) || undefined,
          category_id: (filters.category?.value as number) || undefined,
          status: "",
        };
      },

      // 활성 필터 여부 확인
      hasActiveFilters: (): boolean => {
        const { filters } = get();
        return !!(
          filters.search ||
          filters.date?.value !== initialFilters.date?.value ||
          filters.scale?.value !== initialFilters.scale?.value ||
          filters.radius?.value !== initialFilters.radius?.value ||
          filters.category?.value !== initialFilters.category?.value
        );
      },
    }),
    {
      name: "filter-store",
    }
  )
);
