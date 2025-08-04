import ChevronIcon from '@/app/_assets/ChevronIcon';
import { useState } from 'react';

const CarouselButton = ({
  onClick,
  type,
}: {
  onClick: () => void;
  type: 'prev' | 'next';
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full transition-opacity opacity-0 hover:opacity-100 cursor-pointer
        ${type === 'prev' ? 'left-2' : 'right-2'}`}
    >
      <ChevronIcon className={type === 'prev' ? 'rotate-180' : ''} />
    </button>
  );
};

export const CarouselIndicator = ({
  currentIndex,
  total,
  onClick,
}: {
  currentIndex: number;
  total: number;
  onClick: (index: number) => void;
}) => {
  return (
    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
      {Array.from({ length: total }).map((_, index) => (
        <button
          onClick={() => onClick(index)}
          key={index}
          className={`w-2 h-2 rounded-full transition-opacity ${
            index === currentIndex
              ? 'bg-white'
              : 'border-1 border-white bg-transparent'
          }`}
          aria-label={`${index + 1}번째 이미지로 이동`}
        />
      ))}
    </div>
  );
};

export const EventDetailImages = ({ imageUrls }: { imageUrls?: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className='w-full h-[12.5rem] rounded-[0.625rem] overflow-hidden animate-pulse bg-bg_3' />
    );
  }

  /** 이미지 이동 */
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  /** 스와이프 */
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setTouchEnd(null);
    setTouchStart(null);
  };

  return (
    <div className='relative w-full h-[12.5rem] rounded-[0.625rem] overflow-hidden'>
      {/* 이미지 컨테이너 */}
      <div
        className='flex transition-transform duration-300 ease-in-out h-full'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`event image ${index + 1}`}
            className='w-full h-full object-cover flex-shrink-0'
          />
        ))}
      </div>

      {imageUrls.length > 1 && (
        <>
          <CarouselButton onClick={goToPrevious} type='prev' />
          <CarouselButton onClick={goToNext} type='next' />
        </>
      )}

      {/* 인디케이터 점들 */}
      <CarouselIndicator
        currentIndex={currentIndex}
        total={imageUrls.length}
        onClick={goToSlide}
      />
    </div>
  );
};
