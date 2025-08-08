'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { addMonths, startOfMonth, format, differenceInMonths } from 'date-fns';
import 'react-day-picker/dist/style.css';
import CalendarWeekday from '@/components/calendar/CalendarWeekday';
import DropdownIcon from '../_assets/DropdownIcon';

const ScrollableCalendar = () => {
  // ① 시작 달(1월로 렌더될 달)을 우리가 고정해야 index 계산이 정확해짐
  const baseMonth = startOfMonth(new Date(new Date().getFullYear(), 0, 1));
  // ② 스크롤 가운데에 가장 가까운 달
  const [centerMonth, setCenterMonth] = useState<Date>(baseMonth);
  const [ready, setReady] = useState(false); // ← 첫 페인트 전에 숨겨두기
  const today = format(new Date(), 'dd');

  const containerRef = useRef<HTMLDivElement>(null);
  const MONTH_TO_SHOW = 12;

  // 특정 인덱스의 달을 컨테이너 중앙으로 스크롤
  const scrollToMonthIndex = (idx: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;

    const monthEls = container.querySelectorAll<HTMLElement>(
      '.rdp-month_grid, .rdp-month'
    );
    if (!monthEls.length) return;

    const safeIdx = Math.min(Math.max(idx, 0), monthEls.length - 1);
    const target = monthEls[safeIdx];
    const top =
      target.offsetTop - (container.clientHeight - target.clientHeight) / 2;

    const prevBehavior = (container.style as any).scrollBehavior;
    (container.style as any).scrollBehavior = smooth ? 'smooth' : 'auto';
    container.scrollTo({ top });
    (container.style as any).scrollBehavior = prevBehavior ?? '';

    setCenterMonth(addMonths(baseMonth, safeIdx));
  };

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

  const handleToday = () => {
    // baseMonth(1월) 기준 오늘까지의 월 차이 → 오늘이 속한 달 인덱스
    const idx = differenceInMonths(startOfMonth(new Date()), baseMonth);
    scrollToMonthIndex(idx);
  };

  // ✅ 첫 렌더: 보이지 않게 렌더 → 즉시(자동) 스크롤 → 보이기
  useLayoutEffect(() => {
    const idx = differenceInMonths(startOfMonth(new Date()), baseMonth);
    scrollToMonthIndex(idx, false); // 애니메이션 없이 즉시 위치
    setReady(true); // 이제 보여줌
  }, []);

  return (
    <div className='height-without-layout flex justify-center'>
      <div>
        <div className='h-[3.125rem] flex justify-between px-5 items-center'>
          <button className='cursor-pointer inline-flex items-center text-2xl text-text_b font-semibold'>
            {ready && format(centerMonth, 'MMMM yyyy')}
            <span className='w-4 h-4 bg-bg inline-flex items-center justify-center ml-3 rounded-full'>
              <DropdownIcon />
            </span>
          </button>
          <button
            onClick={handleToday}
            className='cursor-pointer inline-flex rounded-full w-9 h-9 border border-text-b items-center justify-center'
          >
            {today}
          </button>
        </div>
        <div
          className={`overflow-y-auto h-[calc(100vh-6.25rem-5.875rem-3.125rem)] ${ready ? '' : 'invisible'}`}
          ref={containerRef}
          onScroll={handleScroll}
        >
          <DayPicker
            month={baseMonth}
            numberOfMonths={MONTH_TO_SHOW}
            classNames={{
              months: 'flex flex-col gap-2.5 items-center',
              month: 'm-0 py-11 shadow-[0px_10px_34px_0px_#0000000F]',
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
