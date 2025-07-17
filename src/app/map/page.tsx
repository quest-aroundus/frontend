'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useGeo } from '@/hooks/useGeo';
import { useEvents } from '@/hooks/queries/useEvents';


const MapboxMap = dynamic(() => import('@/components/MapboxMap'));

const MapSkeleton = () => (<div>로딩중...</div>)

const MapPage = () => {
  const { location: currentLocation } = useGeo();

  const { data: events } = useEvents();

  return (
    <main className="relative w-full height-without-layout">
      <Suspense fallback={<MapSkeleton />}>
        {currentLocation && <MapboxMap
          markers={events}
          currentLocation={currentLocation}
        />}
      </Suspense>
    </main>
  );
};

export default MapPage;
