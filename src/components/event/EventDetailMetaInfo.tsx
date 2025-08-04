import CalendarIcon from '@/app/_assets/CalendarIcon';
import RoundChevronIcon from '@/app/_assets/RoundChevronIcon';
import { createICS } from '@/utils/ics';
import type { Event } from '@/types/event';
import MapIcon from '@/app/_assets/MapIcon';
import { createContext, useContext } from 'react';
import moveToMap from '@/utils/map';

// Context 생성
const EventDetailMetaInfoContext = createContext<{ event: Event } | null>(null);

const useEventDetailMetaInfoContext = () => {
  const context = useContext(EventDetailMetaInfoContext);
  if (!context) {
    throw new Error(
      'EventDetailMetaInfo 서브 컴포넌트는 EventDetailMetaInfo 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};

const EventDetailInfoWrapper = ({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-start gap-2'>
        <span className='flex items-center justify-center text-[#B8B6C7]'>
          {icon}
        </span>
        <div className='text-sm text-text_g'>{children}</div>
      </div>
      <button
        className='flex items-center justify-center cursor-pointer'
        onClick={onClick}
      >
        <RoundChevronIcon />
      </button>
    </div>
  );
};

// 메인 컴포넌트
const EventDetailMetaInfo = ({
  event,
  children,
}: {
  event: Event;
  children: React.ReactNode;
}) => {
  return (
    <EventDetailMetaInfoContext.Provider value={{ event }}>
      <div className='flex flex-col gap-2'>{children}</div>
    </EventDetailMetaInfoContext.Provider>
  );
};

// Date 서브 컴포넌트
const EventDetailMetaInfoDate = () => {
  const { event } = useEventDetailMetaInfoContext();

  const dateKR = new Date(event.start_dt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const timeKR = new Date(event.start_dt).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleClick = async () => {
    await createICS(event);
  };

  return (
    <EventDetailInfoWrapper
      icon={<CalendarIcon width={24} height={24} />}
      onClick={handleClick}
    >
      <div className='leading-6'>{dateKR}</div>
      <div className='leading-5'>{timeKR}</div>
    </EventDetailInfoWrapper>
  );
};

// Location 서브 컴포넌트
const EventDetailMetaInfoLocation = () => {
  const { event } = useEventDetailMetaInfoContext();

  const handleClick = async () => {
    moveToMap(event.location.address);
  };

  return (
    <EventDetailInfoWrapper
      icon={<MapIcon width={24} height={24} />}
      onClick={handleClick}
    >
      <div className='leading-6'>{event.location.address}</div>
    </EventDetailInfoWrapper>
  );
};

// 컴파운드 패턴을 위한 서브 컴포넌트 할당
EventDetailMetaInfo.Date = EventDetailMetaInfoDate;
EventDetailMetaInfo.Location = EventDetailMetaInfoLocation;

export default EventDetailMetaInfo;

// 기존 컴포넌트들도 호환성을 위해 export (추후 제거 가능)
export const EventDetailDateInfo = EventDetailMetaInfoDate;
export const EventDetailGeoInfo = EventDetailMetaInfoLocation;
