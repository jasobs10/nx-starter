import { ApiError } from '@revision/shared/data-access/api-client';
import { UseMutationOptions } from '@tanstack/react-query';

export type MutationMethod = 'PUT' | 'POST' | 'DELETE' | 'PATCH';

export interface MutationConfig<TRequestBody, TParams = void> {
  data?: TRequestBody;
  method: MutationMethod;
  params?: TParams;
}

export type UseApiMutationOptions<TRequestBody, TParams = void, TResponseData = void> = Omit<
  UseMutationOptions<TResponseData, ApiError, MutationConfig<TRequestBody, TParams>>,
  'mutationFn'
> & {
  isFile?: boolean;
  shouldRefreshTokenOnUnauthorized?: boolean;
};
