import { createEvent, EventAttributes } from 'ics';
import { Event } from '@/types/event';

export const createICS = async (event: Event) => {
  const start = new Date(event.start_dt);
  const end = new Date(event.end_dt);

  const icsEvent: EventAttributes = {
    start: [
      start.getFullYear(),
      start.getMonth() + 1,
      start.getDate(),
      start.getHours(),
      start.getMinutes(),
    ],
    end: [
      end.getFullYear(),
      end.getMonth() + 1,
      end.getDate(),
      end.getHours(),
      end.getMinutes(),
    ],
    title: event.title,
    description: event.description,
    location: event.location.address,
    url: `${window.location.origin}/event/${event.id}`,
    geo: { lat: event.location.latitude, lon: event.location.longitude },
  };

  const filename = `${event.title}.ics`;
  const file = await new Promise((resolve, reject) => {
    createEvent(icsEvent, (error, value) => {
      if (error) {
        reject(error);
      }

      resolve(new File([value], filename, { type: 'text/calendar' }));
    });
  });
  const url = URL.createObjectURL(file as Blob);

  // trying to assign the file URL to a window could cause cross-site
  // issues so this is a workaround using HTML5
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
};
