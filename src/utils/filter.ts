import {
  EventLocationRadius,
  EventQueryParams,
  EventSearchParams,
  EventSize,
  SelectedFilters,
} from "@/types/event";
import { getDateRangeFromFilter } from "./date";

export const getApiParamsFromFilterOptions = (
  filters: SelectedFilters
): EventSearchParams => {
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
};

export const getApiParamsFromQueryParams = (
  searchParams: EventQueryParams
): EventSearchParams => {
  const dateRange = getDateRangeFromFilter(searchParams.date);

  return {
    search: searchParams.search,
    start_dt: dateRange.start,
    end_dt: dateRange.end,
    location_latitude: 0,
    location_longitude: 0,
    location_radius:
      searchParams?.radius !== undefined
        ? (Number(searchParams.radius) as EventLocationRadius)
        : undefined,
    event_size: searchParams.scale as EventSize,
    category_id:
      searchParams.category !== undefined
        ? Number(searchParams.category)
        : undefined,
    status: "",
  };
};
