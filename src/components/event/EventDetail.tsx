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

const EventDetailItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`flex flex-col h-fit bg-white px-5 py-3 ${className}`}>
      {children}
    </section>
  );
};

const EventDetail = ({ id }: { id: string }) => {
  const { data: event } = useEvent(id);

  return (
    <article className='flex flex-col gap-[0.625rem] h-fit bg-bg'>
      <EventDetailItem className='gap-5'>
        <EventDetailImages imageUrls={event.imageUrls} />

        <header className='flex flex-col gap-2'>
          <h1 className='text-xl font-semibold'>{event.title}</h1>
        </header>

        <section className='flex gap-2'>
          <EventInfoChip type='category' value={event.categoryId} />
          <EventInfoChip type='eventSize' value={event.eventSize} />
        </section>

        <EventDetailMetaInfo event={event}>
          <EventDetailMetaInfo.Date />
          <EventDetailMetaInfo.Location />
        </EventDetailMetaInfo>
      </EventDetailItem>

      <EventDetailItem className='gap-2'>{event.description}</EventDetailItem>

      <EventDetailItem className='gap-2'>
        <EventDetailMapInfo event={event} />
      </EventDetailItem>
    </article>
  );
};

const SuspenseEventDetail = ({ id }: { id: string }) => {
  return (
    <Suspense fallback={<EventDetailSkeleton />}>
      <main className='flex flex-col flex-1 max-w-vw overflow-x-hidden h-full'>
        <EventDetail id={id} />
      </main>
    </Suspense>
  );
};

export default SuspenseEventDetail;
