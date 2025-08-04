import SuspenseEventList from '@/components/event/EventList';
import MainLayout from '@/components/layout/MainLayout';
import { eventOptions } from '@/hooks/queries/useEvents';
import { getApiParamsFromQueryParams } from '@/utils/filter';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ListPage = async ({ searchParams }: PageProps) => {
  const queryClient = new QueryClient();

  const resolvedSearchParams = await searchParams;
  const apiParams = getApiParamsFromQueryParams(resolvedSearchParams);
  await queryClient.prefetchQuery(eventOptions(apiParams));

  return (
    <MainLayout>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SuspenseEventList
          apiParams={apiParams}
          searchParams={resolvedSearchParams}
        />
      </HydrationBoundary>
    </MainLayout>
  );
};

export default ListPage;
