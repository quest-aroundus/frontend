'use client';

import { useEvents } from '@/hooks/queries/useEvents';
import FullCalendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth'


const CalendarPage = () => {
  const { data: events } = useEvents();

  return <main className='height-without-layout'>
    <FullCalendar
      plugins={[multiMonthPlugin]}
      initialView='multiMonthYear'
      height='100%'
      fixedWeekCount={false}
      viewClassNames='flex-col nowrap items-center'
      eventClassNames='text-red-500'
      eventDisplay='block'
    />
  </main>;
};

export default CalendarPage;
