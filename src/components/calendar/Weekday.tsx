'use client';

const Weekday = () => {
  const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <thead>
      <tr>
        {WEEK_DAYS.map((day, index) => (
          <th
            key={`${index}_${day}`}
            className={`text-base font-semibold pb-5 leading-5 text-center ${index === 0 ? 'text-main_r' : 'text-text_b'}`}
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Weekday;
