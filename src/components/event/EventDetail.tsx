'use client';

import { Suspense } from 'react';
import { useEvent } from '@/hooks/queries/useEvent';
import { EventDetailImages } from './EventDetailImages';

const EventDetailSkeleton = () => {
  return <div>Loading...</div>;
};

const EventDetail = ({ id }: { id: string }) => {
  const { data: event } = useEvent(id);

  return (
    <div>
      <EventDetailImages imageUrls={event.imageUrls} />
      <div>이벤트 상세 - {event.title}</div>
      <div>이벤트 상세 정보가 여기에 표시됩니다.</div>
      <div>{JSON.stringify(event)}</div>
    </div>
  );
};

const SuspenseEventDetail = ({ id }: { id: string }) => {
  return (
    <Suspense fallback={<EventDetailSkeleton />}>
      <EventDetail id={id} />
    </Suspense>
  );
};

export default SuspenseEventDetail;
