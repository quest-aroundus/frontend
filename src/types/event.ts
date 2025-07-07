// 백엔드 API 기반 이벤트 크기
export type EventSize = "small" | "medium" | "large";

// 백엔드 API 기반 검색 반경 (km) 0이면 전체
export type EventLocationRadius = 0 | 5 | 10 | 20;

// 백엔드 API 검색 파라미터
export interface EventSearchParams {
  search?: string; // 이벤트 이름/설명 검색
  start_dt?: string; // YYYY-MM-DDTHH:MM:SS 형식
  end_dt?: string; // YYYY-MM-DDTHH:MM:SS 형식
  location_latitude?: number; // 위도 (소수점 6자리)
  location_longitude?: number; // 경도 (소수점 6자리)
  location_radius?: EventLocationRadius; // 검색 반경 (km)
  event_size?: EventSize; // 이벤트 규모
  category_id?: number; // 카테고리 ID
  status?: string; // 이벤트 상태
}

// UI용 필터 옵션
export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  category: "size" | "radius" | "category" | "status";
}

// 선택된 필터들 (UI 상태 관리용)
export interface SelectedFilters {
  search: string;
  dateRange: {
    start?: Date;
    end?: Date;
  };
  location: {
    latitude?: number;
    longitude?: number;
    radius?: EventLocationRadius;
  };
  eventSize?: EventSize;
  categoryId?: number;
  status?: string;
}

// 이벤트 기본 타입
export interface Event {
  id: string;
  title: string;
  description: string;
  start_dt: string;
  end_dt: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  category_id: number;
  event_size: EventSize;
  status: string;
  imageUrl?: string;
}
