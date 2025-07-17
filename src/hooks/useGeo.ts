import { useEffect, useState } from 'react';

export interface Coordinate {
  latitude: number;
  longitude: number;
  id: string;
}

export const TORONTO_CITY_HALL: Coordinate = {
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
          console.log('현재 위치 갱신됨:', pos.coords);
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            id: 'current',
          });
        },
        (err) => {
          console.error('현재 위치 요청 실패:', err);
          setError('위치 권한이 필요합니다.');
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
