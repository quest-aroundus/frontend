export interface Notification {
  id: number;
  title: string;
  body: string;
  event_id: number | null;
  created_at: string;
}

export type NotificationPeriod = 'today' | 'this_week' | 'earlier';
export type NotificationGroup = {
  [key in NotificationPeriod]: Notification[];
};
