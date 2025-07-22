import { useEffect, useState } from 'react';

export interface Coordinate {
  latitude: number;
  longitude: number;
  id: string;
}

const TORONTO_CITY_HALL: Coordinate = {
  latitude: 43.6532,
  longitude: -79.3832,
  id: 'toronto-city-hall',
};

export const useGeo = () => {
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            id: 'current',
          });
        },
        (err) => {
          setLocation(TORONTO_CITY_HALL);
        }
      );
    } else {
      setError('Geolocation API를 지원하지 않습니다.');
    }
  };

  // 첫 로드 시 한 번 요청
  useEffect(() => {
    requestLocation();
  }, []);

  return { location, error, requestLocation };
};
