'use client';

import { useRouter } from 'next/navigation';
import { useEvent } from '@/hooks/queries/useEvent';
import { copyToClipboard } from '@/utils/common';
import ArrowLeftIcon from '@/app/_assets/ArrowLeftIcon';
import LinkIcon from '@/app/_assets/LinkIcon';

const EventDetailHeader = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: event } = useEvent(id);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    copyToClipboard(`${window.location.origin}/event/${event.id}`);
  };

  return (
    <header className='sticky z-10 w-full top-0 px-5 pt-[3.125rem] pb-[0.625rem] bg-white'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center text-main_b'>
          <button onClick={() => router.push('/event')}>
            <ArrowLeftIcon />
          </button>
          <div className='text-xl font-semibold'>이벤트</div>
        </div>

        <button onClick={handleClick}>
          <LinkIcon />
        </button>
      </div>
    </header>
  );
};

export default EventDetailHeader;
