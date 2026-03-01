import { Outlet, ScrollRestoration } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/store/AuthProvider';
import React, { Suspense } from 'react';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const ReactQueryDevtools =
  import.meta.env.DEV
    ? React.lazy(() =>
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    )
    : () => null;

export default function RootProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <ScrollRestoration />
      </AuthProvider>
      <Toaster richColors position="top-center" />
      <Suspense fallback={null}>
        <ReactQueryDevtools />
      </Suspense>
    </QueryClientProvider>
  );
}
