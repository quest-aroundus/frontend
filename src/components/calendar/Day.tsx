'use client';

import type { Event } from '@/types/event';
import { useMemo } from 'react';

interface DayProps {
  date: Date;
  events: Event[];
  onClick?: (date: Date) => void;
}

// 간단 해시 → 항상 같은 ID면 같은 숫자 반환
function hashIdToIndex(id: number, length: number) {
  let hash = id;
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
  hash = (hash >> 16) ^ hash;
  return Math.abs(hash) % length;
}

const Day = ({ date, events, onClick }: DayProps) => {
  const today = new Date();
  const isToday =
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear();
  const isSunday = date.getDay() === 0;
  const colorClasses = [
    'bg-sub_r',
    'bg-sub_o',
    'bg-sub_b',
    'bg-sub_green',
    'bg-sub_g',
    'bg-main_r',
    'bg-main_b',
    'bg-main_db',
  ];
  const assignedColors = useMemo(() => {
    if (!events?.length) return [];
    return events.map((e) => {
      const idx = hashIdToIndex(e.id, colorClasses.length);
      return colorClasses[idx];
    });
  }, [events]);
  return (
    <td
      className={`text-center ${events.length > 0 ? 'cursor-pointer' : ''} `}
      onClick={() => events.length > 0 && onClick?.(date)}
    >
      <span
        className={`w-5 h-5 block mx-auto ${isToday ? 'text-main_b font-bold' : isSunday ? 'text-main_r' : ''}`}
      >
        {date.getDate()}
      </span>
      <div className='h-[1.125rem] flex flex-col items-center mt-1'>
        <>
          <div className='gap-1 flex items-center justify-center'>
            {events.map(
              (event, idx) =>
                idx < 2 && (
                  <span
                    key={event.id}
                    className={`rounded-xs w-2 h-2 inline-block ${assignedColors[idx]}`}
                  ></span>
                )
            )}
          </div>
          {events.length > 3 && (
            <span className='rounded-xs mt-1 w-5 h-1.5 inline-flex items-center justify-center bg-bg'>
              <i className='w-0.5 h-0.5 bg-sub_g rounded-full' />
              <i className='w-0.5 h-0.5 bg-sub_g rounded-full mx-0.5' />
              <i className='w-0.5 h-0.5 bg-sub_g rounded-full' />
            </span>
          )}
        </>
      </div>
    </td>
  );
};

export default Day;
