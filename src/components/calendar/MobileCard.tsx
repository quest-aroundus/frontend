import type { Event } from '@/types/event';
import { useEffect, useRef, useState } from 'react';
import Card from '../map/Card';

interface MobileCardProps {
  events: Event[];
}

const MobileCard = ({ events }: MobileCardProps) => {
  if (events.length <= 1) {
    return (
      <div className='inline-block w-full'>
        <Card item={events[0]} />
      </div>
    );
  }
  return (
    <div className='overflow-x-auto px-2 py-4 flex gap-4'>
      {events.map((event) => (
        <div key={event.id} className='inline-block w-fit'>
          <Card item={event} />
        </div>
      ))}
    </div>
  );
};
export default MobileCard;
