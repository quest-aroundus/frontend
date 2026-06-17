import { Notification } from '@/types/notification';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: 'King West Open House – Starting Today!',
    body: 'The King West Open House Weekend kicks off today at 10:00 AM. Over 15 properties are available to tour — no appointment needed.',
    event_id: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Reminder: Yorkville Seminar Tonight at 6:30 PM',
    body: 'Your registered spot for the First-Time Homebuyer Seminar in Yorkville is confirmed. Doors open at 6:00 PM at 100 Bloor St W.',
    event_id: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Distillery Condo Showcase – Registration Open',
    body: 'Early registration is now open for the Distillery District Condo Showcase on July 5–6. Register by June 28 to access exclusive pre-launch pricing.',
    event_id: 3,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    title: 'North York Auction: Bidder Registration Closes Soon',
    body: 'Bidder registration for the North York Estate Property Auction closes July 10. Submit your certified cheque deposit before the deadline.',
    event_id: 5,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default MOCK_NOTIFICATIONS;
