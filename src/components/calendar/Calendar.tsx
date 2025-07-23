'use client';

import FullCalendar from '@fullcalendar/react'
import multiMonthPlugin from '@fullcalendar/multimonth'

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[multiMonthPlugin]}
      initialView="multiMonthYear"
      height="100%"
      fixedWeekCount={false}
    />
  )
}

export default Calendar;