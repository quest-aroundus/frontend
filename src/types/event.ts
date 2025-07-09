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
  limit?: number;
  offset?: number;
}

// UI용 필터 옵션
export type FilterType = "scale" | "radius" | "category" | "date";
export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  type: FilterType;
  isDefault?: boolean;
}

// 선택된 필터들 (UI 상태 관리용)
export interface SelectedFilters {
  search?: string;
  date?: FilterOption;
  scale?: FilterOption;
  radius?: FilterOption;
  category?: FilterOption;
}

// 이벤트 기본 타입
export interface EventResponse {
  id: number;
  name: string;
  description: string;
  start_dt: string;
  end_dt: string;
  location_name: string;
  location_address: string;
  location_latitude: number;
  location_longitude: number;
  category_id: number;
  event_size: EventSize;
  thumbnail_url: string;
  status: string;
  language_code: string;
  image_urls: string[];
}

export interface Event {
  id: number;
  title: string;
  description: string;
  start_dt: string;
  end_dt: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  categoryId: number;
  eventSize: EventSize;
  status: string;
  thumbnailUrl: string;
  imageUrls?: string[];
}
