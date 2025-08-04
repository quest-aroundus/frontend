'use client';

import { Suspense } from 'react';
import { useEvent } from '@/hooks/queries/useEvent';
import { EventDetailImages } from './EventDetailImages';
import EventInfoChip from '../common/EventInfoChip';
import EventDetailMetaInfo from './EventDetailMetaInfo';
import EventDetailMapInfo from './EventDetailMapInfo';

const EventDetailSkeleton = () => {
  return <div>Loading...</div>;
};

const EventDetailItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-5 h-fit bg-white px-5 py-3'>
      {children}
    </div>
  );
};

const EventDetail = ({ id }: { id: string }) => {
  const { data: event } = useEvent(id);

  return (
    <div className='flex flex-col gap-[0.625rem] h-fit bg-bg'>
      <EventDetailItem>
        <EventDetailImages imageUrls={event.imageUrls} />

        <div className='flex flex-col gap-2'>
          <div className='text-xl font-semibold'>{event.title}</div>
        </div>

        <div className='flex gap-2'>
          <EventInfoChip type='category' value={event.categoryId} />
          <EventInfoChip type='eventSize' value={event.eventSize} />
        </div>

        <EventDetailMetaInfo event={event}>
          <EventDetailMetaInfo.Date />
          <EventDetailMetaInfo.Location />
        </EventDetailMetaInfo>
      </EventDetailItem>

      <EventDetailItem>
        <div className='flex flex-col gap-2'>{event.description}</div>
      </EventDetailItem>

      <EventDetailItem>
        <EventDetailMapInfo event={event} />
      </EventDetailItem>
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
