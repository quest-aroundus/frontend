import type { Event } from '@/types/event';
import Card from '../map/Card';
import { useEffect, useMemo, useRef, useState } from 'react';

interface MobileCardProps {
  events: Event[];
}

const CHUNK_SIZE = 3;

const MobileCard = ({ events }: MobileCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  const visibleEvents = useMemo(
    () => events.slice(0, page * CHUNK_SIZE),
    [events, page]
  );

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const threshold = 20;
    const isAtEnd =
      container.scrollWidth - container.scrollLeft - container.clientWidth <
      threshold;

    if (isAtEnd && page * CHUNK_SIZE < events.length) {
      setPage((prev) => prev + 1);
    }
  };

  if (events.length <= 1) {
    return (
      <div className='inline-flex w-full justify-center px-2 py-4'>
        <Card item={events[0]} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className='overflow-x-auto px-2 py-4 flex gap-4 w-full'
    >
      {visibleEvents.map((event) => (
        <div key={event.id} className='inline-block w-fit'>
          <Card key={event.id} item={event} />
        </div>
      ))}
    </div>
  );
};
export default MobileCard;
