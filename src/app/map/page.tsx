'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { type Coordinate, useGeo } from '@/hooks/useGeo';


const MapboxMap = dynamic(() => import('@/components/MapboxMap'));

const MapSkeleton = () => (<div>로딩중...</div>)

const MapPage = () => {
  const { location: currentLocation } = useGeo();
  const [markers, setMarkers] = useState<Coordinate[]>([]);

  useEffect(() => {
    const loadMarkers = async () => {
      // const data = await fetchLocations();
      // setMarkers(data);
    };
    loadMarkers();
  }, []);


  return (
    <main className="relative w-full height-without-layout">
      <Suspense fallback={<MapSkeleton />}>
        {currentLocation && <MapboxMap
          markers={markers}
          currentLocation={currentLocation}
        />}
      </Suspense>
    </main>
  );
};

export default MapPage;
