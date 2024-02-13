import { ApiError } from '@revision/shared/data-access/api-client';
import { UseQueryOptions } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';

export type UseApiQueryOptions<
  TApiResponseData,
  TData = TApiResponseData,
  TQueryParams extends ParsedUrlQuery = ParsedUrlQuery
> = Omit<
  UseQueryOptions<TApiResponseData, ApiError, TData, [string | undefined, TQueryParams]>,
  'queryKey'
> & {
  params?: TQueryParams;
  requestMethod?: 'GET' | 'POST';
  shouldRefreshTokenOnUnauthorized?: boolean;
};
