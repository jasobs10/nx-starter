import { PropsWithChildren } from 'react';
import ApiQueryClientProvider from './api-query-client-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <ApiQueryClientProvider>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </ApiQueryClientProvider>
);
