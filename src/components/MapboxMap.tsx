'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  latitude: number;
  longitude: number;
};

const MapboxMap = ({ latitude, longitude }: Props) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 12,
    });

    // 마커 추가
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    return () => map.remove(); // 컴포넌트 언마운트 시 지도 제거
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} className="pt-[6.25rem] pb-[5.875rem] w-full h-screen rounded" />;
}

export default MapboxMap;