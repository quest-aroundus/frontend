import type { Metadata } from "next";

// 동적 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // 실제로는 API에서 이벤트 데이터를 가져와야 합니다
  // 현재는 예시로 하드코딩된 데이터를 사용합니다
  const eventId = params.id;

  return {
    title: `이벤트 ${eventId} - AROUNDUS`,
    description: `이벤트 ${eventId}에 대한 상세 정보를 확인하세요.`,
    keywords: ["이벤트", "모임", "활동"],
    openGraph: {
      title: `이벤트 ${eventId}`,
      description: `이벤트 ${eventId}에 참여하세요!`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `이벤트 ${eventId}`,
      description: `이벤트 ${eventId}에 참여하세요!`,
    },
  };
}

const DetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <h1>이벤트 상세 - {params.id}</h1>
      <p>이벤트 상세 정보가 여기에 표시됩니다.</p>
    </main>
  );
};

export default DetailPage;
