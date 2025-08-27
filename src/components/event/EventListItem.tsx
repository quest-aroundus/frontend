'use client';

import { Event } from '@/types/event';
import { useMemo } from 'react';
import LocationIcon from '@/app/_assets/LocationIcon';
import LinkIcon from '@/app/_assets/LinkIcon';
import EventInfoChip from '../common/EventInfoChip';
import { copyToClipboard } from '@/utils/common';

export const EventListItemSkeleton = () => {
  return (
    <div className='p-5 bg-white flex flex-col gap-[0.625rem]'>
      <div className='flex items-center gap-2 w-full h-[9.375rem] relative rounded-[0.625rem] overflow-hidden bg-gray-200 animate-pulse'></div>

      <div>
        <div className='h-8 bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='h-4 bg-gray-200 rounded animate-pulse mb-1'></div>
        <div className='h-4 bg-gray-200 rounded animate-pulse w-3/4'></div>
      </div>

      {/* 카테고리 칩 스켈레톤 */}
      <div className='flex gap-2'>
        <div className='w-20 h-6 bg-gray-200 rounded-full animate-pulse'></div>
        <div className='w-16 h-6 bg-gray-200 rounded-full animate-pulse'></div>
      </div>

      {/* 위치 정보 스켈레톤 */}
      <div className='flex items-center gap-1'>
        <div className='h-4 bg-gray-200 rounded animate-pulse w-full'></div>
      </div>
    </div>
  );
};

interface EventListItemProps {
  event: Event;
}

const EventThumbnail = ({ event }: EventListItemProps) => {
  const startDay = useMemo(() => {
    return new Date(event.start_dt).toLocaleDateString('en-US', {
      day: 'numeric',
    });
  }, [event.start_dt]);
  const startMonth = useMemo(() => {
    return new Date(event.start_dt).toLocaleDateString('en-US', {
      month: 'short',
    });
  }, [event.start_dt]);

  const endDay = useMemo(() => {
    return new Date(event.end_dt).toLocaleDateString('en-US', {
      day: 'numeric',
    });
  }, [event.end_dt]);
  const endMonth = useMemo(() => {
    return new Date(event.end_dt).toLocaleDateString('en-US', {
      month: 'short',
    });
  }, [event.end_dt]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    copyToClipboard(`${window.location.origin}/event/${event.id}`);
  };

  return (
    <div className='flex items-center gap-2 w-full h-[9.375rem] relative rounded-[0.625rem] overflow-hidden'>
      <div className='absolute top-[0.625rem] left-[0.625rem] w-[4.5rem] h-[3.125rem] p-[0.188rem] rounded-[0.438rem] bg-white opacity-70 flex flex-col items-center justify-center z-1'>
        <div className='text-xl font-bold'>
          {startDay === endDay ? startDay : `${startDay}-${endDay}`}
        </div>
        <div className='text-xs font-bold'>
          {startMonth === endMonth ? startMonth : `${startMonth}/${endMonth}`}
        </div>
      </div>
      <img
        src={event.thumbnailUrl}
        alt={event.title}
        className='w-full h-full object-cover flex-shrink-0'
      />
      <button
        onClick={handleClick}
        className='absolute top-[0.625rem] right-[0.625rem] w-[3.125rem] h-[3.125rem] p-[0.188rem] rounded-[0.438rem] bg-white opacity-70 flex flex-col items-center justify-center z-1'
      >
        <LinkIcon />
      </button>
    </div>
  );
};

export const EventListItem = ({ event }: EventListItemProps) => {
  return (
    <a
      href={`/event/${event.id}`}
      key={event.id}
      className='p-5 bg-white flex flex-col gap-[0.625rem]'
    >
      <EventThumbnail event={event} />

      <div>
        <div className='text-2xl font-semibold'>{event.title}</div>
        <div className='text-base text-text_b line-clamp-2'>
          {event.description}
        </div>
      </div>

      <div className='flex gap-2'>
        <EventInfoChip type='category' value={event.categoryId} />
        <EventInfoChip type='eventSize' value={event.eventSize} />
      </div>

      <div className='flex items-center gap-1'>
        <LocationIcon className='text-main_b self-start' />
        <div className='text-sm'>{event.location.address}</div>
      </div>
    </a>
  );
};
