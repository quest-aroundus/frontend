import { useSuspenseQuery } from '@tanstack/react-query';
import { transformEvent } from './useEvents';
import { EventResponse } from '@/types/event';
import { ApiResponse } from '@/types/response';
import MOCK_EVENT_DETAIL from '@/mocks/events';

// export const fetchEvent = async (id: string) => {
//   const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${id}`;
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch event');
//   }
//   return response.json();
// };

export const fetchEvent = async (id: string): Promise<ApiResponse<EventResponse>> => {
  const event = MOCK_EVENT_DETAIL[id] ?? MOCK_EVENT_DETAIL['1'];
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: event }), 200)
  );
};

export const eventOptions = (id: string) => ({
  queryKey: ['event', id],
  queryFn: () => fetchEvent(id),
  select: (data: ApiResponse<EventResponse>) => {
    return transformEvent(data.data);
  },
});

export const useEvent = (id: string) => {
  return useSuspenseQuery(eventOptions(id));
};
