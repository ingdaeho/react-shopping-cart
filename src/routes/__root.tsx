import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GNB from '../components/GNB/GNB';
import { cartItemQueryOptions } from './cart/-queryOptions';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(cartItemQueryOptions()),
});

function RootComponent() {
  const { data } = useSuspenseQuery(cartItemQueryOptions());
  return (
    <>
      <GNB cartItemCount={data.length} />
      <Outlet />
      <ReactQueryDevtools buttonPosition='top-right' />
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
