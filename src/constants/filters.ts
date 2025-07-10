import { FilterOption } from "@/types/event";

// 이벤트 크기 필터 (백엔드 API와 매칭)
export const EVENT_SIZE_FILTERS: FilterOption[] = [
  { id: "all", label: "Show all", type: "scale", value: "", isDefault: true },
  { id: "large", label: "Over 10,000", type: "scale", value: "large" },
  { id: "medium", label: "Over 1,000", type: "scale", value: "medium" },
  { id: "small", label: "Under 1,000", type: "scale", value: "small" },
];

// 검색 반경 필터 (백엔드 API와 매칭)
export const LOCATION_RADIUS_FILTERS: FilterOption[] = [
  {
    id: "radius_0",
    label: "Show all",
    type: "radius",
    value: 0,
    isDefault: true,
  },
  { id: "radius_5", label: "5 km", type: "radius", value: 5 },
  { id: "radius_10", label: "10 Km", type: "radius", value: 10 },
  { id: "radius_20", label: "20 Km", type: "radius", value: 20 },
];

// 날짜 필터
export const DATE_FILTERS: FilterOption[] = [
  {
    id: "date_any",
    label: "Any date",
    type: "date",
    value: "any",
    isDefault: true,
  },
  {
    id: "date_this_week",
    label: "This week",
    type: "date",
    value: "this_week",
  },
  {
    id: "date_this_month",
    label: "This month",
    type: "date",
    value: "this_month",
  },
];

export const CATEGORY_DEFAULT_FILTER: FilterOption = {
  id: "all",
  label: "Show all",
  value: 0,
  type: "category",
  isDefault: true,
};
