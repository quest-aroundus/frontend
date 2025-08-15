import type { Event } from '@/types/event';
import { useEffect, useRef, useState } from 'react';
import Card from '../map/Card';

interface MobileCardProps {
  events: Event[];
}

const MobileCard = ({ events }: MobileCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 10;

    if (isAtEnd && !isFetching) {
      setIsFetching(true);
    }
  };

  // fetch 후 로딩 끝나면 다시 요청 가능하게
  useEffect(() => {
    if (!isFetching) return;
    const timer = setTimeout(() => setIsFetching(false), 1000); // 중복 호출 방지
    return () => clearTimeout(timer);
  }, [isFetching]);
  return (
    <div className='whitespace-nowrap overflow-x-auto -mx-4 px-4'>
      {events.length === 1 ? (
        <div className='inline-block w-full'>
          <Card item={events[0]} />
        </div>
      ) : (
        events.map((event) => (
          <div key={event.id} className='inline-block w-fit mr-4'>
            <Card item={event} />
          </div>
        ))
      )}
    </div>
  );
};
export default MobileCard;
