'use client';

import { Notification, NotificationPeriod } from '@/types/notification';
import { useNotifications } from '@/hooks/queries/useNotifications';
import Image from 'next/image';
import NotificationThumbnail from '@/app/_assets/NotificationThumbnail.png';

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(Math.abs(diffInMs) / (1000 * 60));
      const diffInHours = Math.floor(Math.abs(diffInMs) / (1000 * 60 * 60));

      // 과거 날짜인 경우
      if (diffInMinutes < 1) {
        return '방금 전';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
      } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
      } else {
        return date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    } catch (error) {
      console.error('Error in formatTime:', error);
      return '알 수 없는 시간';
    }
  };

  return (
    <div
      className={`flex gap-5 w-[362px] cursor-pointer transition-all duration-200`}
    >
      {/* 아이콘 영역 - Figma 디자인과 동일한 크기 */}
      <div className='flex-shrink-0 w-[77px] h-[77px] rounded-[10px] overflow-hidden bg-[#FFCD6C]'>
        <Image
          src={NotificationThumbnail}
          alt='notification thumbnail'
          width={77}
          height={77}
        />
      </div>

      {/* 텍스트 영역 */}
      <div className='flex-1 flex flex-col gap-2.5'>
        <h3 className='text-sm font-semibold text-[#2D2626] leading-tight'>
          {notification.title}
        </h3>
        <p className='text-sm text-[#2D2626] leading-tight'>
          {notification.body}
        </p>
        <p className='text-xs text-[#868686] leading-tight'>
          {formatTime(notification.created_at)}
        </p>
      </div>
    </div>
  );
};

const notificationPeriodTitle = {
  today: 'Today',
  this_week: 'This Week',
  earlier: 'Earlier',
};

const NotificationList = () => {
  const { data: notifications } = useNotifications();

  return (
    <div className='w-full min-h-full flex flex-col gap-5'>
      {notifications &&
        Object.entries(notifications).map(
          ([period, notificationList]) =>
            notificationList.length > 0 && (
              <div key={period} className='flex flex-col bg-white p-5 gap-5'>
                {/* 기간 헤더 */}
                <h2 className='text-base font-semibold text-[#2D2626] leading-tight'>
                  {notificationPeriodTitle[period as NotificationPeriod]}
                </h2>

                {/* 알림 아이템들 */}
                <div className='flex flex-col gap-5'>
                  {notificationList.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default NotificationList;
