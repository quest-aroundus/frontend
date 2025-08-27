'use client';

import { useRouter } from 'next/navigation';
import ArrowLeftIcon from '@/app/_assets/ArrowLeftIcon';

const NotificationHeader = () => {
  const router = useRouter();

  return (
    <header className='w-full px-5 pt-[3.125rem] pb-[0.625rem] bg-transparent'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center text-main_b'>
          <button onClick={() => router.push('/event')}>
            <ArrowLeftIcon />
          </button>
          <div className='text-xl font-semibold'>Notification</div>
        </div>
      </div>
    </header>
  );
};

export default NotificationHeader;
