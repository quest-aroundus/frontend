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
  const initialYear = new Date().getFullYear();
  const [startYear, setStartYear] = useState(initialYear);
  const [endYear, setEndYear] = useState(initialYear);
  const [centerMonth, setCenterMonth] = useState(() =>
    startOfMonth(new Date())
  );
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);
  const [ready, setReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const MONTH_TO_SHOW = (endYear - startYear + 1) * 12;

  const baseMonth = startOfMonth(new Date(startYear, 0, 1));

  const params = useMemo(() => {
    return {
      limit: 100,
      start_dt: format(centerMonth, 'yyyy-MM-dd'),
      end_dt: format(addMonths(centerMonth, 12), 'yyyy-MM-dd'),
    };
  }, [centerMonth]);

  const { data: events = [] } = useEvents(params);

  const handleEvent = (day: Date) => {
    const key = format(day, 'yyyy-MM-dd');
    return (
      events?.filter((e) => {
        const sKey = e.start_dt.split('T')[0];
        const tKey = e.end_dt.split('T')[0];
        return key >= sKey && key <= tKey;
      }) || []
    );
  };

  const handleDayClick = (day: Date) => {
    setSelectedDateEvents(handleEvent(day));
  };

  const scrollToMonthIndex = (idx: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;

    const monthEls = container.querySelectorAll<HTMLElement>('.rdp-month_grid');
    if (!monthEls.length) return;

    const safeIdx = Math.min(Math.max(idx, 0), monthEls.length - 1);
    const target = monthEls[safeIdx];
    const top =
      target.offsetTop - (container.clientHeight - target.clientHeight) / 2;

    const prevBehavior = container.style.scrollBehavior;
    container.style.scrollBehavior = smooth ? 'smooth' : 'auto';
    container.scrollTo({ top });
    container.style.scrollBehavior = prevBehavior ?? '';

    setCenterMonth(addMonths(baseMonth, safeIdx));
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const monthEls = container.querySelectorAll<HTMLElement>('.rdp-month_grid');
    if (!monthEls.length) return;

    const scrollTop = container.scrollTop;
    const scrollHeightBefore = container.scrollHeight;
    const clientHeight = container.clientHeight;

    const threshold = 50;

    if (scrollTop < threshold) {
      const prevYear = startYear - 1;
      setStartYear(prevYear);

      // ✅ DOM 변화를 감지한 후 scrollTop 보정
      const observer = new MutationObserver(() => {
        observer.disconnect();
        const newScrollHeight = container.scrollHeight;
        const addedHeight = newScrollHeight - scrollHeightBefore;
        container.scrollTop = scrollTop + addedHeight;
      });

      observer.observe(container, { childList: true, subtree: true });
    } else if (scrollTop + clientHeight > container.scrollHeight - threshold) {
      setEndYear(endYear + 1);
    }

    // 중심 월 계산
    const containerCenterY = scrollTop + clientHeight / 2;
    const cRect = container.getBoundingClientRect();
    let centerIdx = 0;
    let minDist = Infinity;

    monthEls.forEach((el, idx) => {
      const r = el.getBoundingClientRect();
      const elCenterY = r.top - cRect.top + scrollTop + r.height / 2;
      const dist = Math.abs(elCenterY - containerCenterY);
      if (dist < minDist) {
        minDist = dist;
        centerIdx = idx;
      }
    });

    setCenterMonth(addMonths(baseMonth, centerIdx));
  };

  const handleToday = () => {
    const now = new Date();
    const newStartYear = now.getFullYear();
    setStartYear(newStartYear);
    setEndYear(newStartYear);

    requestAnimationFrame(() => {
      const idx = differenceInMonths(
        startOfMonth(now),
        startOfMonth(new Date(newStartYear, 0, 1))
      );
      scrollToMonthIndex(idx, false);
    });
  };

  useLayoutEffect(() => {
    handleToday();
    setReady(true);
  }, []);

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
            className='cursor-pointer inline-flex text-main_b font-semibold text-base items-center justify-center'
          >
            Today
          </button>
        </div>
        <div
          ref={containerRef}
          className={`overflow-y-auto h-[calc(100vh-6.25rem-5.875rem-3.125rem)] ${ready ? '' : 'invisible'}`}
          onScroll={handleScroll}
        >
          <DayPicker
            month={startOfMonth(new Date(startYear, 0, 1))}
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
