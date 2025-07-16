'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Coordinate } from '@/hooks/useGeo';
import CurrentLocationIcon from '@/app/_assets/CurrentLocationIcon';

interface MapboxProps {
  markers: Coordinate[];
  currentLocation: Coordinate;
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const MapboxMap = ({ markers, currentLocation }: MapboxProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [currentLocation.longitude, currentLocation.latitude],
        zoom: 13,
      });

      // // 🔵 API 마커들 찍기
      // markers.forEach((marker) => {
      //   new mapboxgl.Marker({ color: 'blue' })
      //     .setLngLat([marker.longitude, marker.latitude])
      //     .addTo(mapRef.current!);
      // });

      // 🔴 현재 위치 마커
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([currentLocation.longitude, currentLocation.latitude])
        .addTo(mapRef.current!);

    }
  }, []);

  // 📍 버튼 클릭 시 현재 위치로 이동
  const moveToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [currentLocation.longitude, currentLocation.latitude],
        zoom: 14,
        essential: true,
      });
    }
  };

  return (<>
    <div ref={mapContainerRef} className="w-full h-full" />
    <button
      onClick={moveToCurrentLocation}
      className="absolute bottom-5 right-5 z-50 bg-white rounded-[0.625rem] h-14 w-14 shadow-[0px_0px_20px_0px_#716E90] border border-border_lg inline-flex items-center justify-center"
    >
      <CurrentLocationIcon />
    </button>
  </>)
};
export default MapboxMap;