import { EventCategory } from '@/types/event';

const MOCK_CATEGORIES: EventCategory[] = [
  { id: 1, slug: 'open-house', name: 'Open House', description: 'Property viewings and open house events', language_code: 'en' },
  { id: 2, slug: 'seminar', name: 'Seminar', description: 'Educational workshops and buyer/investor seminars', language_code: 'en' },
  { id: 3, slug: 'auction', name: 'Auction', description: 'Live property auctions', language_code: 'en' },
  { id: 4, slug: 'networking', name: 'Networking', description: 'Industry mixers and investor networking events', language_code: 'en' },
  { id: 5, slug: 'showcase', name: 'Showcase', description: 'New development launches and property tours', language_code: 'en' },
];
export default MOCK_CATEGORIES;
