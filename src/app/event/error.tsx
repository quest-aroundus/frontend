'use client';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useInfiniteEvents } from '@/hooks/queries/useEvents';

interface EventErrorProps {
  error: Error;
  reset: () => void;
}

const EventError = ({ reset }: EventErrorProps) => {
  const { refetch } = useInfiniteEvents();
  return (
    <div className='flex flex-col justify-center items-center p-8 gap-4'>
      <div className='text-red-500'>이벤트를 불러오는데 실패했습니다.</div>
      <button
        onClick={() => {
          reset();
          refetch();
        }}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        다시 시도
      </button>
    </div>
  );
};

export default function Error({ error }: { error: Error }) {
  const { reset } = useQueryErrorResetBoundary();
  return <EventError error={error} reset={reset} />;
}
