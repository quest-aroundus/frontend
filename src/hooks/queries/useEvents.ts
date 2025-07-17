import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import type { Event, EventResponse, EventSearchParams } from "@/types/event";
import type { ApiResponse } from "@/types/response";

export const fetchEvents = async (
  params: EventSearchParams
): Promise<ApiResponse<EventResponse[]>> => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/event?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("이벤트 데이터를 불러오는데 실패했습니다.");
  }
  return response.json();
};

export const transformEvent = (event: EventResponse): Event => {
  return {
    id: event.id,
    title: event.name,
    description: event.description,
    start_dt: event.start_dt,
    end_dt: event.end_dt,
    location: {
      latitude: event.location_latitude,
      longitude: event.location_longitude,
      address: event.location_address,
    },
    categoryId: event.category_id,
    eventSize: event.event_size,
    status: event.status,
    thumbnailUrl: event.thumbnail_url,
  };
};

export const eventOptions = (
  params: EventSearchParams = { limit: 10 }
): UseSuspenseQueryOptions<
  ApiResponse<EventResponse[]>,
  Error,
  Event[],
  (string | EventSearchParams)[]
> => ({
  queryKey: ["events", params],
  queryFn: () => fetchEvents(params),
  select: (data: ApiResponse<EventResponse[]>) => {
    return data.data.map((event) => transformEvent(event));
  },
});

export const useEvents = (params?: EventSearchParams) => {
  return useSuspenseQuery(eventOptions(params));
};

export const eventInfiniteOptions = (
  params: EventSearchParams = { limit: 10 }
) => ({
  queryKey: ["events-infinite", params],
  queryFn: async ({ pageParam }: { pageParam: number }) => {
    const response = await fetchEvents({
      ...params,
      offset: pageParam,
      limit: 20,
    });
    return {
      data: response.data.map((event) => transformEvent(event)),
      previousOffset: response.pagination?.offset ?? 0,
      nextOffset: response.pagination?.next_offset ?? 0,
      total: response.pagination?.total ?? 0,
      limit: response.pagination?.limit ?? 0,
    };
  },
  getNextPageParam: function (lastPage: {
    data: Event[];
    previousOffset: number;
    nextOffset: number;
    total: number;
    limit: number;
  }) {
    return lastPage.total > lastPage.nextOffset + lastPage.limit
      ? lastPage.nextOffset + lastPage.limit
      : null;
  },
  initialPageParam: 0,
});

export const useInfiniteEvents = (params?: EventSearchParams) => {
  return useSuspenseInfiniteQuery(eventInfiniteOptions(params));
};
