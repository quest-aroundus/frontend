'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Coordinate } from '@/hooks/useGeo';
import type { Event } from '@/types/event';
import CurrentLocationIcon from '@/app/_assets/CurrentLocationIcon';
import Card from './map/Card';

interface MapboxProps {
  markers: Event[];
  currentLocation: Coordinate;
}

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

      // 🔵 API 마커들 찍기
      markers.forEach((marker) => {
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([marker.location.longitude, marker.location.latitude])
          .addTo(mapRef.current!);
      });

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

  return (
    <>
      <div ref={mapContainerRef} className='w-full h-full' />
      <section className='absolute bottom-5 right-5 z-50 w-full h-full inline-flex flex-col items-end justify-end gap-5'>
        <button
          onClick={moveToCurrentLocation}
          className=' bg-white rounded-[0.625rem] h-14 w-14 shadow-[0px_0px_20px_0px_#716E90] border border-border_lg inline-flex items-center justify-center'
        >
          <CurrentLocationIcon />
        </button>
        <div className='flex gap-2.5'>
          {
            markers.map((marker) => (
              <Card item={marker} key={marker.id} />
            ))
          }
        </div>
      </section>
    </>
  );
};
export default MapboxMap;
