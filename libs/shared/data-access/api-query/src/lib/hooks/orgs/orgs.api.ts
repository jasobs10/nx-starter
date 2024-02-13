import { OrgDto } from '@revision/shared/data-access/api-types';
import { useApiQuery } from '../../use-api-query';
import { UseApiQueryOptions } from '../../types';

export const ORGS_ENDPOINT = 'orgs';

export const makeOrgEndpoint = (orgId: string | undefined) =>
  orgId ? `${ORGS_ENDPOINT}/${orgId}` : undefined;
export const useOrgApiQuery = (orgId: string | undefined, options?: UseApiQueryOptions<OrgDto>) =>
  useApiQuery(makeOrgEndpoint(orgId), options);
