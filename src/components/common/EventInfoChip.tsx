'use client';

import useCategories from '@/hooks/queries/useCategories';
import { useMemo } from 'react';

interface EventInfoChipProps {
  type: 'category' | 'eventSize';
  value: string | number;
}

const EventInfoChip = ({ type, value }: EventInfoChipProps) => {
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
          return '1,000↓';
        case 'medium':
          return '1,000↑';
        case 'large':
          return '10,000↑';
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

export default EventInfoChip;
