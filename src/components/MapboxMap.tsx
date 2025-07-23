'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const zoomLevel = 13;
  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [currentLocation.longitude, currentLocation.latitude],
      zoom: zoomLevel,
    });

    // 🔴 현재 위치 마커
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([currentLocation.longitude, currentLocation.latitude])
      .addTo(mapRef.current!);

    // 🔵 API 마커들 찍기
    markers.forEach((marker) => {
      const mapboxMarker = new mapboxgl.Marker({ color: 'blue' })
        .setLngLat([marker.location.longitude, marker.location.latitude]).setOffset([0, -100])
        .addTo(mapRef.current!);

      mapboxMarker.getElement().addEventListener('click', () => {
        setSelectedId(marker.id);
      });

      mapboxMarker.getElement().addEventListener('mouseenter', () => {
        mapboxMarker.getElement().style.cursor = 'pointer';
      });
      mapboxMarker.getElement().addEventListener('mouseleave', () => {
        mapboxMarker.getElement().style.cursor = '';
      });
    });
    // 마우스 커서 변경
  }, []);

  // 📍 버튼 클릭 시 현재 위치로 이동
  const moveToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [currentLocation.longitude, currentLocation.latitude],
        zoom: zoomLevel,
        essential: true,
      });
    }
  };

  const handleMarkerClick = (marker: Event) => {
    setSelectedId(marker.id);
    mapRef.current?.flyTo({
      center: [marker.location.longitude, marker.location.latitude],
      offset: [0, -100],
      zoom: zoomLevel,
    });
  }

  const floatingClassName = 'absolute z-50'

  return (
    <>
      <div ref={mapContainerRef} className='w-full h-full' />
      <button
        onClick={moveToCurrentLocation}
        className={`right-5 bottom-[14.5rem] bg-white rounded-[0.625rem] h-14 w-14 shadow-[0px_0px_20px_0px_#716E90] border border-border_lg inline-flex items-center justify-center ${floatingClassName}`}
      >
        <CurrentLocationIcon />
      </button>
      <section className={`px-5 bottom-5 w-full flex overflow-x-auto scroll-smooth ${floatingClassName}`}>
        <div className='flex gap-2.5'>
          {
            markers.map((marker) => (
              <Card
                item={marker}
                key={marker.id}
                selectedId={selectedId}
                onSelect={handleMarkerClick}
              />
            ))
          }
        </div>
      </section>
    </>
  );
};
export default MapboxMap;
