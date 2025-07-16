'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { type Coordinate, useGeo } from '@/hooks/useGeo';

// MapboxMap은 클라이언트 컴포넌트지만, 부모가 상태 다 관리
const MapboxMap = dynamic(() => import('@/components/MapboxMap'));

export const MapPage = () => {
  const { location: currentLocation, error: geoError } = useGeo();
  const [markers, setMarkers] = useState<Coordinate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkers = async () => {
      // const data = await fetchLocations();
      // setMarkers(data);
      setLoading(false);
    };
    loadMarkers();
  }, []);

  if (geoError) return <p>{geoError}</p>;
  if (!currentLocation) return <p>현재 위치를 가져오는 중...</p>;
  if (loading) return <p>마커 데이터를 불러오는 중...</p>;

  return (
    <main className="relative w-full height-without-layout">
      <MapboxMap
        markers={markers}
        currentLocation={currentLocation}
      />
    </main>
  );
};

export default MapPage;
