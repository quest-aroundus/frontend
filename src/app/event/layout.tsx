import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: {
    template: '%s - 이벤트 | AROUNDUS',
    default: '이벤트 | AROUNDUS',
  },
  description: '다양한 이벤트와 모임을 찾아보세요.',
};

const EventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-fit'>
      <MainLayout>{children}</MainLayout>
    </div>
  );
};

export default EventLayout;
