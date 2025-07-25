'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useGeo } from '@/hooks/useGeo';
import { useEvents } from '@/hooks/queries/useEvents';
import MapSkeleton from '@/components/map/MapSkeleton';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'));

const MapPage = () => {
  const { location: currentLocation } = useGeo();

  const { data: events } = useEvents();

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
