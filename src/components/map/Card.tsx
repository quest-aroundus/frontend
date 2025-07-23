import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import EventInfoChip from '../common/EventInfoChip';
import LocationIcon from '@/app/_assets/LocationIcon';
import type { Event } from '@/types/event';
import Link from 'next/link';

interface CardProps {
  item: Event;
}

const Card = ({ item }: CardProps) => {
  const useFormatDate = (date: string) => useMemo(() => {
    return new Date(date).toLocaleDateString('ko-KR').replace(/ /g, '').slice(0, -1);
  }, [date]);

  return (
    <Link
      href={`/events/${item.id}`}
      className='cursor-pointer flex bg-white w-[22.25rem] rounded-[10px] p-4 shadow-[0px_0px_10px_0px_#00000040]'
    >
      <div className='mr-2.5'>
        <time className='text-main_b text-xs'>{useFormatDate(item.start_dt)}~{useFormatDate(item.end_dt)}</time>
        <h1 className='text-text_b font-bold text-xl leading-6'>{item.title}</h1>
        <span className='line-clamp-2 text-text_b leading-[1.187rem]'>{item.description}</span>
        <div className='flex gap-2 mt-2.5'>
          <EventInfoChip type='category' value={item.categoryId} />
          <EventInfoChip type='eventSize' value={item.eventSize} />
        </div>
        <div className='inline-flex items-center gap-1 mt-1'>
          <LocationIcon className='text-main_b' />
          <address title={item.location.address} className='line-clamp-1 text-text_b text-xs not-italic'>{item.location.address}</address>
        </div>
      </div>
      <Image
        src={item.thumbnailUrl || '/default-image.png'}
        alt={item.title}
        width={100}
        height={160}
        priority
        className='w-[6.25rem] h-40 object-fill rounded-[0.625rem]'
      />
    </Link>
  )
}

export default Card;