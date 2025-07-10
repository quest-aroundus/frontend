import { useEffect, useState } from 'react';

interface Coordinate {
  id: string;
  latitude: number;
  longitude: number;
}

export const useGeo = () => {
  const TORONTO_CITY_HALL = {
    id: 'torontoCityHall',
    latitude: 43.6532,
    longitude: -79.3832,
  }

  const [location, setLocation] = useState<Coordinate>(TORONTO_CITY_HALL);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            id: 'current',
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.error(err);
          setError('위치 권한이 필요합니다.');
        }
      );
    } else {
      setError('Geolocation API를 지원하지 않습니다.');
    }
  }, []);

  return { location, error };
};
