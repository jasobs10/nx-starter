import { ApiClient } from '@jasobs10/api-client';
import { environment } from './environment/environment';

export const apiClient = new ApiClient(environment.apiBaseUrl);
