"use client";

import { Suspense } from "react";
import EventFilter from "./EventFilter";
import { useEvents } from "@/hooks/queries/useEvents";
import { EventQueryParams, EventSearchParams } from "@/types/event";

const EventListSkeleton = () => {
  return <div className="flex flex-col gap-4">로딩중</div>;
};

interface EventListProps {
  searchParams: EventQueryParams;
  apiParams: EventSearchParams;
}

const EventList = ({ apiParams, searchParams }: EventListProps) => {
  // 이벤트 데이터 페칭
  const { data: events, isError } = useEvents(apiParams);

  if (isError) {
    throw new Error("이벤트를 불러오는데 실패했습니다.");
  }

  return (
    <>
      <EventFilter searchParams={searchParams} />

      {/* FIXME: 확인용 ai generated 이벤트 목록 */}
      <div className="flex flex-col gap-[0.625rem] bg-bg">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="p-4 bg-white">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <div className="text-sm text-gray-500">
                <div>📅 {new Date(event.start_dt).toLocaleString("ko-KR")}</div>
                <div>📍 {event.location.address}</div>
                <div>
                  📊{" "}
                  {event.eventSize === "small"
                    ? "소규모"
                    : event.eventSize === "medium"
                      ? "중규모"
                      : "대규모"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            조건에 맞는 이벤트가 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

const SuspenseEventList = ({ apiParams, searchParams }: EventListProps) => {
  return (
    <main className="flex flex-col">
      <Suspense fallback={<EventListSkeleton />}>
        <EventList apiParams={apiParams} searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default SuspenseEventList;
