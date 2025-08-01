'use client';

import { useEvents } from '@/hooks/queries/useEvents';
import type { Event } from '@/types/event';
import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth'

const mockData: Event[] = [{
  id: 1,
  title: 'Sample Event',
  description: 'This is a sample event description.',
  start_dt: new Date().toISOString(),
  end_dt: new Date(new Date().getTime() + 360000000).toISOString(),
  location: {
    latitude: 37.5665,
    longitude: 126.978,
    address: 'Seoul, South Korea',
  },
  categoryId: 1,
  eventSize: 'large',
  status: 'active',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
},
{
  id: 2,
  title: 'Another Event',
  description: 'This is another sample event description.',
  start_dt: new Date(new Date().getTime() + 86400000).toISOString(),
  end_dt: new Date(new Date().getTime() + 864000000).toISOString(),
  location: {
    latitude: 37.5665,
    longitude: 126.978,
    address: 'Seoul, South Korea',
  },
  categoryId: 2,
  eventSize: 'large',
  status: 'active',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
},
{
  id: 3,
  title: 'Same Event',
  description: 'This is another sample event description.',
  start_dt: new Date(new Date().getTime() + 86400000).toISOString(),
  end_dt: new Date(new Date().getTime() + 864000000).toISOString(),
  location: {
    latitude: 37.5665,
    longitude: 126.978,
    address: 'Seoul, South Korea',
  },
  categoryId: 2,
  eventSize: 'large',
  status: 'active',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
},
{
  id: 4,
  title: 'Same2 Event',
  description: 'This is another sample event description.',
  start_dt: new Date(new Date().getTime() + 86400000).toISOString(),
  end_dt: new Date(new Date().getTime() + 864000000).toISOString(),
  location: {
    latitude: 37.5665,
    longitude: 126.978,
    address: 'Seoul, South Korea',
  },
  categoryId: 2,
  eventSize: 'large',
  status: 'active',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
},
]
const CalendarPage = () => {
  const { data: events } = useEvents();

  const convertToCalendarEvent = (event: Event) => ({
    id: String(event.id),
    title: event.title,
    start: event.start_dt,
    end: event.end_dt,
    extendedProps: {
      description: event.description,
      location: event.location,
      categoryId: event.categoryId,
      eventSize: event.eventSize,
      status: event.status,
      thumbnailUrl: event.thumbnailUrl,
      imageUrls: event.imageUrls,
    }
  });

  return <main className='height-without-layout'>
    <FullCalendar
      plugins={[multiMonthPlugin]}
      initialView='multiMonthYear'
      height='100%'
      fixedWeekCount={false}
      viewClassNames='flex-col !flex-nowrap items-center'
      eventClassNames='text-red-500'
      events={events.concat(mockData)?.map(convertToCalendarEvent) || []}
      displayEventTime={false}
    />
  </main>;
};

export default CalendarPage;
