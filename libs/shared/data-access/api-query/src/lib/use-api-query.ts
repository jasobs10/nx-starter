import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';
import { UseApiQueryOptions } from './types/use-api-query.types';
import { ApiError } from '@jasobs10/api-client';
import { apiClient } from './api-client';

export const useApiQuery = <
  TApiResponseData,
  TData = TApiResponseData,
  TQueryParams extends ParsedUrlQuery = ParsedUrlQuery
>(
  url: string | undefined,
  {
    shouldRefreshTokenOnUnauthorized,
    ...options
  }: UseApiQueryOptions<TApiResponseData, TData, TQueryParams> = {}
): UseQueryResult<TData, ApiError> => {
  const {
    params = {} as TQueryParams,
    requestMethod = 'GET',
    queryFn = async () => {
      const responseData = await apiClient.fetch<TApiResponseData>(url, {
        method: requestMethod,
        params,
        shouldRefreshTokenOnUnauthorized
      });
      return responseData;
    },
    ...restOptions
  } = options;

  return useQuery({
    queryKey: [url, params],
    queryFn,
    ...restOptions,
    enabled: !!url && (options.enabled === undefined ? true : options.enabled)
  });
};
