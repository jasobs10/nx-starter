import { UseApiQueryOptions } from '../../types';
import { UserDto } from '@revision/shared/data-access/api-types';
import { useApiQuery } from '../../use-api-query';

export const ME_ENDPOINT = 'me';
export const useMeApiQuery = (options?: UseApiQueryOptions<UserDto>) =>
  useApiQuery(ME_ENDPOINT, options);
