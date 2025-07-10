import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  SelectedFilters,
  FilterType,
  EventQueryParams,
  FilterOption,
} from "@/types/event";
import {
  CATEGORY_DEFAULT_FILTER,
  DATE_FILTERS,
  EVENT_SIZE_FILTERS,
  LOCATION_RADIUS_FILTERS,
} from "@/constants/filters";

interface FilterState {
  // 상태
  filters: SelectedFilters;
  _hasHydrated: boolean;

  // 액션들
  setFilters: (filters: Partial<SelectedFilters>) => void;
  setFiltersWithSync: (
    filters: EventQueryParams,
    categories: FilterOption[]
  ) => void;
  resetFilters: () => void;
  setSearch: (search: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;

  // 유틸리티
  getSelectedValue: (type: FilterType) => string | number;
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
  persist(
    (set, get) => ({
      // 초기 상태
      filters: initialFilters,
      _hasHydrated: false,

      // 필터 관련 액션들
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      setFiltersWithSync: (newFilters, categories) =>
        set((state) => ({
          filters: {
            search: newFilters.search || initialFilters.search,
            date:
              DATE_FILTERS.find(
                (filter) => `${filter.value}` === `${newFilters.date}`
              ) || initialFilters.date,
            scale:
              EVENT_SIZE_FILTERS.find(
                (filter) => `${filter.value}` === `${newFilters.scale}`
              ) || initialFilters.scale,
            radius:
              LOCATION_RADIUS_FILTERS.find(
                (filter) => `${filter.value}` === `${newFilters.radius}`
              ) || initialFilters.radius,
            category:
              categories.find(
                (filter) => `${filter.value}` === `${newFilters.category}`
              ) || initialFilters.category,
          },
        })),

      resetFilters: () =>
        set({
          filters: initialFilters,
        }),

      setSearch: (search) =>
        set((state) => ({
          filters: { ...state.filters, search },
        })),

      setHasHydrated: (hasHydrated) =>
        set({
          _hasHydrated: hasHydrated,
        }),

      // 선택된 필터 값 가져오기
      getSelectedValue: (type: FilterType) => {
        const { filters } = get();
        const selectedFilter = filters[type as keyof SelectedFilters];
        return typeof selectedFilter === "object" ? selectedFilter.id : "";
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
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
