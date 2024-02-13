import { useMutation } from '@tanstack/react-query';
import { UseApiMutationOptions } from './types/use-api-mutation.types';
import { apiClient } from './api-client';

export const useApiMutation = <TRequestBody, TParams = void, TResponseData = void>(
  url: string,
  {
    shouldRefreshTokenOnUnauthorized,
    isFile,
    ...options
  }: UseApiMutationOptions<TRequestBody, TParams, TResponseData> = {}
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ method, data }) => {
      const responseData = await apiClient.fetch<TResponseData, TRequestBody>(url, {
        method,
        body: data,
        isFile,
        shouldRefreshTokenOnUnauthorized
      });

      return responseData;
    }
  });
};
