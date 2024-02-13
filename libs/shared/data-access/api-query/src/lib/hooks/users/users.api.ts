import { UseApiQueryOptions } from '../../types';
import { UserDto } from '@jasobs10/api-types';
import { useApiQuery } from '../../use-api-query';

export const USERS_ENDPOINT = 'users';
export const useUsersApiQuery = (options?: UseApiQueryOptions<UserDto[]>) =>
  useApiQuery(USERS_ENDPOINT, options);
