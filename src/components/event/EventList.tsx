'use client';

import { Suspense, useEffect } from 'react';
import EventFilter from './EventFilter';
import { useInfiniteEvents } from '@/hooks/queries/useEvents';
import { EventQueryParams, EventSearchParams } from '@/types/event';
import { EventListItem } from './EventListItem';
import { useInView } from 'react-intersection-observer';

const EventListSkeleton = () => {
  return <div className='flex flex-col gap-4'>로딩중</div>;
};

interface EventListProps {
  searchParams: EventQueryParams;
  apiParams: EventSearchParams;
}

const EventList = ({ apiParams, searchParams }: EventListProps) => {
  // 이벤트 데이터 페칭
  const {
    data: events,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteEvents(apiParams);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    throw new Error('이벤트를 불러오는데 실패했습니다.');
  }

  return (
    <>
      <EventFilter searchParams={searchParams} />

      <div className='flex flex-col gap-[0.625rem] bg-bg'>
        {events && events.pages.length > 0 ? (
          events.pages.flatMap((page) =>
            page.data.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))
          )
        ) : (
          <div className='text-center py-8 text-gray-500'>
            조건에 맞는 이벤트가 없습니다.
          </div>
        )}
      </div>
      <div ref={ref} />
    </>
  );
};

const SuspenseEventList = ({ apiParams, searchParams }: EventListProps) => {
  return (
    <main className='flex flex-col'>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList apiParams={apiParams} searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default SuspenseEventList;
