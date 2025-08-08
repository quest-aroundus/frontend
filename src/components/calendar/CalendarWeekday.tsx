'use client';

const CalendarWeekday = () => {
  const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <thead className='text-xs text-gray-500'>
      {WEEK_DAYS.map((day, index) => (
        <th
          key={`${index}_${day}`}
          className={`text-center font-semibold ${index === 0 ? 'text-main_r' : 'text-text_b'}`}
        >
          {day}
        </th>
      ))}
    </thead>
  );
};

export default CalendarWeekday;
