'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useGeo } from '@/hooks/useGeo';
import { useEvents } from '@/hooks/queries/useEvents';
import MapSkeleton from '@/components/map/MapSkeleton';
import { addMonths, format } from 'date-fns';

const MapboxMap = dynamic(() => import('@/components/map/MapboxMap'));

const MapPage = () => {
  const { location: currentLocation } = useGeo();
  const today = format(new Date(), 'yyyy-MM-dd');

  const { data: events } = useEvents({
    limit: 100,
    start_dt: today,
    end_dt: today,
  });

  return (
    <main className='relative w-full height-without-layout'>
      <Suspense fallback={<MapSkeleton />}>
        {/* TODO: 스켈레톤 맵 전체로 확장 */}
        {currentLocation && (
          <MapboxMap markers={events} currentLocation={currentLocation} />
        )}
      </Suspense>
    </main>
  );
};

export default MapPage;
