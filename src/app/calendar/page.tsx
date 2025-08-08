'use client';

import { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { addMonths, startOfMonth, format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import CalendarWeekday from '@/components/calendar/CalendarWeekday';
import DropdownIcon from '../_assets/DropdownIcon';

const ScrollableCalendar = () => {
  // ① 시작 달(첫 번째로 렌더될 달)을 우리가 고정해야 index 계산이 정확해짐
  const baseMonth = startOfMonth(new Date());
  // ② 스크롤 가운데에 가장 가까운 달
  const [centerMonth, setCenterMonth] = useState<Date>(baseMonth);
  const today = format(new Date(), 'dd');

  const containerRef = useRef<HTMLDivElement>(null);
  const MONTH_TO_SHOW = 12;
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const monthEls = container.querySelectorAll<HTMLElement>('.rdp-month_grid');
    if (!monthEls.length) return;

    const containerCenterY = container.scrollTop + container.clientHeight / 2;
    const cRect = container.getBoundingClientRect();

    let centerIdx = 0; // 현재까지 가장 가까운 달 index
    let minimumDist = Number.POSITIVE_INFINITY; // 현재까지 가장 가까운 거리, 어떤 수와 비교해도 무조건 작아짐. 반복문 첫 번째애서 무조건 갱신되도록 하는 장치

    monthEls.forEach((el, idx) => {
      const r = el.getBoundingClientRect();
      const elCenterY = r.top - cRect.top + container.scrollTop + r.height / 2;
      const dist = Math.abs(elCenterY - containerCenterY);
      if (dist < minimumDist) {
        minimumDist = dist;
        centerIdx = idx;
      }
    });

    setCenterMonth(addMonths(baseMonth, centerIdx));
  };

  return (
    <div className='height-without-layout flex justify-center'>
      <div>
        <div className='h-[3.125rem] flex justify-between px-5 items-center'>
          <button className='cursor-pointer inline-flex items-center text-2xl text-text_b font-semibold'>
            {format(centerMonth, 'MMMM yyyy')}
            <span className='w-4 h-4 bg-bg inline-flex items-center justify-center ml-3 rounded-full'>
              <DropdownIcon />
            </span>
          </button>
          <span className='inline-flex rounded-full w-9 h-9 border border-text-b items-center justify-center'>
            {today}
          </span>
        </div>
        <div
          className='overflow-y-auto h-[calc(100vh-6.25rem-5.875rem-3.125rem)]'
          ref={containerRef}
          onScroll={handleScroll}
        >
          <DayPicker
            month={baseMonth}
            numberOfMonths={MONTH_TO_SHOW}
            classNames={{
              months: 'flex flex-col gap-3 items-center',
              month: 'm-0',
              month_caption: 'hidden',
              nav: 'hidden',
            }}
            components={{
              Weekdays: () => <CalendarWeekday />,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollableCalendar;
