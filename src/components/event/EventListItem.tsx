import Image from 'next/image';
import { Event } from '@/types/event';
import useCategories from '@/hooks/queries/useCategories';
import { useMemo } from 'react';
import LocationIcon from '@/app/_assets/LocationIcon';
import LinkIcon from '@/app/_assets/LinkIcon';

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
      <Image
        src={event.thumbnailUrl}
        alt={event.title}
        fill
        priority
        className='object-cover'
      />
      <button className='absolute top-[0.625rem] right-[0.625rem] w-[3.125rem] h-[3.125rem] p-[0.188rem] rounded-[0.438rem] bg-white opacity-70 flex flex-col items-center justify-center z-1'>
        <LinkIcon />
      </button>
    </div>
  );
};

interface EventInfoChipProps {
  type: 'category' | 'eventSize';
  value: string | number;
}

export const EventInfoChip = ({ type, value }: EventInfoChipProps) => {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  const getChipColor = (type: 'category' | 'eventSize') => {
    if (type === 'category') {
      return 'bg-main_b text-white';
    }
    return 'bg-ms_lb text-text_b';
  };
  const chipColor = useMemo(() => getChipColor(type), [type]);

  const chipText = useMemo(() => {
    if (type === 'category') {
      return categories?.find((category) => category.value === value)?.label;
    } else {
      switch (value) {
      case 'small':
        return '1000↓';
      case 'medium':
        return '1000↑';
      case 'large':
        return '10000↑';
      default:
        return '이벤트 규모';
      }
    }
  }, [type, value, categories]);

  return (
    <>
      {isCategoriesLoading ? (
        <div className='w-6 h-6 bg-gray-200 rounded-full' />
      ) : (
        <div
          className={`flex items-center rounded-[0.875rem] h-6 px-3 text-xs ${chipColor}`}
        >
          <div>{chipText}</div>
        </div>
      )}
    </>
  );
};

export const EventListItem = ({ event }: EventListItemProps) => {
  return (
    <div key={event.id} className='p-5 bg-white flex flex-col gap-[0.625rem]'>
      <EventThumbnail event={event} />

      <div>
        <div className='text-2xl font-semibold'>{event.title}</div>
        <div className='text-base text-text_b'>{event.description}</div>
      </div>

      <div className='flex gap-2'>
        <EventInfoChip type='category' value={event.categoryId} />
        <EventInfoChip type='eventSize' value={event.eventSize} />
      </div>

      <div className='flex items-center gap-1'>
        <LocationIcon className='text-main_b' />
        <div>{event.location.address}</div>
      </div>
    </div>
  );
};
