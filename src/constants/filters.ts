import { FilterOption } from "@/types/event";

// 이벤트 크기 필터 (백엔드 API와 매칭)
export const EVENT_SIZE_FILTERS: FilterOption[] = [
  { id: "small", label: "소규모", category: "size", value: "small" },
  { id: "medium", label: "중규모", category: "size", value: "medium" },
  { id: "large", label: "대규모", category: "size", value: "large" },
];

// 검색 반경 필터 (백엔드 API와 매칭)
export const LOCATION_RADIUS_FILTERS: FilterOption[] = [
  { id: "radius_0", label: "전체", category: "radius", value: 0 },
  { id: "radius_5", label: "5km", category: "radius", value: 5 },
  { id: "radius_10", label: "10km", category: "radius", value: 10 },
  { id: "radius_20", label: "20km", category: "radius", value: 20 },
];

// 이벤트 상태 필터
export const STATUS_FILTERS: FilterOption[] = [
  { id: "active", label: "진행중", category: "status", value: "active" },
  { id: "upcoming", label: "예정", category: "status", value: "upcoming" },
  { id: "completed", label: "종료", category: "status", value: "completed" },
  { id: "cancelled", label: "취소", category: "status", value: "cancelled" },
];

// 카테고리는 백엔드에서 동적으로 받아올 예정이므로 여기서는 정의하지 않음
// category_id는 API 호출로 받아와야 함

// 모든 필터 옵션
export const ALL_FILTERS: FilterOption[] = [
  ...EVENT_SIZE_FILTERS,
  ...LOCATION_RADIUS_FILTERS,
  ...STATUS_FILTERS,
];

// 카테고리별 필터 맵
export const FILTERS_BY_CATEGORY = {
  size: EVENT_SIZE_FILTERS,
  radius: LOCATION_RADIUS_FILTERS,
  status: STATUS_FILTERS,
} as const;
