"use client";

import { useGeo } from '@/hooks/useGeo';
import dynamic from 'next/dynamic';

// 클라이언트 전용 Mapbox 컴포넌트 불러오기
const MapboxMap = dynamic(() => import('@/components/MapboxMap'));

const MapPage = () => {
  const { location: currentLocation } = useGeo();
  return (
    <main>
      <MapboxMap latitude={currentLocation.latitude} longitude={currentLocation.longitude} />
    </main>
  );
}

export default MapPage