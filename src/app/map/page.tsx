import dynamic from 'next/dynamic';

// 클라이언트 전용 Mapbox 컴포넌트 불러오기
const MapboxMap = dynamic(() => import('@/components/MapboxMap'));

const MapPage = () => {
  return (
    <main>
      <MapboxMap latitude={43.6532} longitude={-79.3832} />
    </main>
  );
}

export default MapPage