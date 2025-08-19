'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { addMonths, startOfMonth, format, differenceInMonths } from 'date-fns';
import 'react-day-picker/dist/style.css';
import Weekday from '@/components/calendar/Weekday';
import DropdownIcon from '../_assets/DropdownIcon';
import { useEvents } from '@/hooks/queries/useEvents';
import type { Event } from '@/types/event';
import Card from '@/components/map/Card';
import Day from '@/components/calendar/Day';
import MobileCard from '@/components/calendar/MobileCard';

const ScrollableCalendar = () => {
  const today = format(new Date(), 'dd');
  // ① 시작 달(1월로 렌더될 달)을 고정해야 index 계산이 정확해짐
  const baseMonth = startOfMonth(new Date(new Date().getFullYear(), 0, 1));
  // ② 스크롤 가운데에 가장 가까운 달
  const [centerMonth, setCenterMonth] = useState<Date>(() =>
    startOfMonth(new Date())
  );
  const [ready, setReady] = useState(false); // 첫 페인트 전에 숨겨두기
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const MONTH_TO_SHOW = 12;

  const params = useMemo(
    () => ({
      limit: 100,
      start_dt: format(centerMonth, 'yyyy-MM-dd'),
      end_dt: format(addMonths(centerMonth, MONTH_TO_SHOW), 'yyyy-MM-dd'),
    }),
    [centerMonth]
  );
  const { data: events } = useEvents(params);

  // 특정 인덱스의 달을 컨테이너 중앙으로 스크롤
  const scrollToMonthIndex = (idx: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;

    const monthEls = container.querySelectorAll<HTMLElement>('.rdp-month_grid');
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

  const handleEvent = (day: Date) => {
    const key = format(day, 'yyyy-MM-dd');
    const dayEvents =
      events?.filter((e) => {
        const sKey = e.start_dt.split('T')[0];
        const tKey = e.end_dt.split('T')[0];
        return key >= sKey && key <= tKey; // 날짜 범위 안에 있으면 포함
      }) || [];

    return dayEvents.length > 0 ? dayEvents : [];
  };

  // 보이지 않게 렌더 → 즉시(자동) 스크롤 → 보이기
  useLayoutEffect(() => {
    const idx = differenceInMonths(startOfMonth(new Date()), baseMonth);
    scrollToMonthIndex(idx, false); // 애니메이션 없이 즉시 위치
    setReady(true); // 이제 보여줌
  }, []);

  const handleDayClick = (day: Date) => {
    setSelectedDateEvents(handleEvent(day));
  };

  return (
    <div className='height-without-layout flex justify-center flex-col tablet:flex-row'>
      <div className='max-w-[25.125rem] w-full'>
        <div className='h-[3.125rem] flex justify-between px-5 items-center'>
          <button className='cursor-pointer inline-flex items-center text-2xl text-text_b font-semibold'>
            {ready && format(centerMonth, 'MMMM yyyy')}
            <span className='w-4 h-4 bg-bg inline-flex items-center justify-center ml-3 rounded-full'>
              <DropdownIcon />
            </span>
          </button>
          <button
            onClick={handleToday}
            className='cursor-pointer inline-flex rounded-xl w-9 h-9 border border-text-b items-center justify-center'
          >
            today
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
              month:
                'm-0 py-11 shadow-[0px_10px_34px_0px_#0000000F] w-[95%] max-w-[25.125rem] tablet:w-full',
              month_caption: 'hidden',
              nav: 'hidden',
              month_grid: 'rdp-month_grid w-full h-[19.5rem]',
              day: 'relative text-center',
              day_button: 'mx-auto',
            }}
            showOutsideDays={false}
            components={{
              Weekdays: () => <Weekday />,
              Day: ({ day }) => {
                if (day.outside) return <td></td>;
                return (
                  <Day
                    date={day.date}
                    events={handleEvent(day.date)}
                    onClick={handleDayClick}
                  />
                );
              },
            }}
          />
        </div>
      </div>
      {selectedDateEvents.length > 0 && (
        <section className='tablet:flex tablet:justify-end tablet:w-1/2 tablet:height-without-layout tablet:overflow-y-scroll'>
          <div className='block overflow-hidden absolute bottom-[5.5rem] left-0 right-0 overflow-x-hidden tablet:hidden'>
            <MobileCard events={selectedDateEvents} />
          </div>

          <div className='hidden tablet:py-5 tablet:pr-5 tablet:flex tablet:justify-center tablet:items-center tablet:flex-col tablet:gap-5 tablet:static h-fit'>
            {selectedDateEvents.map((event) => (
              <Card key={event.id} item={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ScrollableCalendar;
