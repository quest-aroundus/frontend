import { useSuspenseQuery } from '@tanstack/react-query';
import { transformEvent } from './useEvents';
import { EventResponse } from '@/types/event';
import { ApiResponse } from '@/types/response';

export const fetchEvent = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return response.json();
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
