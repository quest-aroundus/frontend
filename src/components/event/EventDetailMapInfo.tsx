'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { type PointLike } from 'mapbox-gl';
import type { Event } from '@/types/event';
import { useRef, useEffect } from 'react';
import CurrentMarker from '../map/CurrentMarker';
import { createRoot } from 'react-dom/client';
import moveToMap from '@/utils/map';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const EventDetailMap = ({ event }: { event: Event }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const zoomLevel = 13;
  const offset: PointLike = [0, -20];

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [event.location.longitude, event.location.latitude],
      zoom: zoomLevel,
    });

    const markerContainer = document.createElement('div');
    const root = createRoot(markerContainer);
    root.render(<CurrentMarker />);
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([event.location.longitude, event.location.latitude])
      .setOffset(offset)
      .addTo(mapRef.current!);
  }, []);

  return <div ref={mapContainerRef} className='w-full h-[12.5rem]' />;
};

const EventDetailMapInfo = ({ event }: { event: Event }) => {
  const handleClick = async () => {
    moveToMap(event.location.address);
  };

  return (
    <>
      <div className='text-xl font-semibold'>위치</div>
      <div
        className='text-sm text-main_b flex flex-col gap-2'
        onClick={handleClick}
      >
        {event.location.address}
        <EventDetailMap event={event} />
      </div>
    </>
  );
};

export default EventDetailMapInfo;
