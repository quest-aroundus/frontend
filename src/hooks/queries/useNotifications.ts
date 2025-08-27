import { Notification, NotificationGroup } from '@/types/notification';
import { ApiResponse } from '@/types/response';
import { useQuery } from '@tanstack/react-query';

export const fetchNotifications = async (): Promise<
  ApiResponse<Notification[]>
> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('이벤트 데이터를 불러오는데 실패했습니다.');
  }
  return response.json();
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await fetchNotifications();
      return response.data;
    },
    select: (data) => {
      const today = new Date();
      const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

      const result: NotificationGroup = {
        today: [],
        this_week: [],
        earlier: [],
      };

      data.forEach((notification) => {
        const notificationDate = new Date(notification.created_at);
        if (notificationDate.toDateString() === today.toDateString()) {
          result.today.push(notification);
        } else if (notificationDate.getTime() >= thisWeek.getTime()) {
          result.this_week.push(notification);
        } else {
          result.earlier.push(notification);
        }
      });

      return result;
    },
  });
};
