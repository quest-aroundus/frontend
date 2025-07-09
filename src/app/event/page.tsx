import SuspenseEventList from "@/components/event/EventList";
import { eventOptions } from "@/hooks/queries/useEvents";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ListPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(eventOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuspenseEventList />
    </HydrationBoundary>
  );
};

export default ListPage;
