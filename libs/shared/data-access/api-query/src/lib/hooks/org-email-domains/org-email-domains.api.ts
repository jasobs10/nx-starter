import { useQueryClient } from '@tanstack/react-query';
import { useApiMutation } from '../../use-api-mutation';
import { OrgType } from '@prisma/client';
import { QueryParams, UseApiMutationOptions, UseApiQueryOptions } from '../../types';
import {
  AccountDto,
  OrgDto,
  OrgEmailDomainDto,
  OrgEmailDomainFilterQueryDto,
  OrgEmailDomainRequestDto
} from '@revision/shared/data-access/api-types';
import { makeOrgEndpoint } from '../orgs/orgs.api';
import { makeAccountEndpoint } from '../accounts/accounts.api';
import { useApiQuery } from '../../use-api-query';

export const ORG_EMAIL_DOMAINS_ENDPOINT = 'org-email-domains';

type MutateOrgEmailDomainMode = 'create' | 'delete';

export interface OrgEmailDomainsMutationParams {
  orgId: string;
  name: string;
  orgName: string;
  orgType: OrgType;
  accountId?: string;
  mode: MutateOrgEmailDomainMode;
}

export const useOrgEmailDomainsApiMutation = (
  options?: UseApiMutationOptions<OrgEmailDomainRequestDto, OrgEmailDomainsMutationParams>
) => {
  const queryClient = useQueryClient();

  return useApiMutation(ORG_EMAIL_DOMAINS_ENDPOINT, {
    ...options,
    onSuccess: (data, variables, context) => {
      const { params } = variables;

      queryClient.invalidateQueries({ queryKey: [ORG_EMAIL_DOMAINS_ENDPOINT] });

      if (params) {
        queryClient.setQueriesData<OrgDto>(
          { queryKey: [makeOrgEndpoint(params.orgId)] },
          (orgDto) => {
            if (!orgDto) return orgDto;

            return updateOrg(orgDto, params);
          }
        );
      }

      if (params?.accountId) {
        queryClient.setQueriesData<AccountDto>(
          { queryKey: [makeAccountEndpoint(params.accountId)] },
          (account) => {
            if (!account?.orgs) return account;

            return {
              ...account,
              orgs: account.orgs.map((org) => {
                if (org.id !== params.orgId) return org;

                return updateOrg(org, params);
              })
            };
          }
        );
      }

      options?.onSuccess?.(data, variables, context);
    }
  });
};

export const useOrgEmailDomainsApiQuery = (
  options: UseApiQueryOptions<
    OrgEmailDomainDto[],
    OrgEmailDomainDto[],
    QueryParams<OrgEmailDomainFilterQueryDto>
  >
) =>
  useApiQuery(ORG_EMAIL_DOMAINS_ENDPOINT, {
    ...options,
    select: (orgEmailDomains) => {
      orgEmailDomains.sort((a, b) => a.orgName.localeCompare(b.orgName));

      if (options.select) {
        orgEmailDomains = options.select(orgEmailDomains);
      }

      return orgEmailDomains;
    }
  });

export const selectSchoolOrgEmailDomains = (
  orgEmailDomains: OrgEmailDomainDto[]
): OrgEmailDomainDto[] => orgEmailDomains.filter(({ orgType }) => orgType === OrgType.School);

const updateOrg = (org: OrgDto, params: OrgEmailDomainsMutationParams): OrgDto => {
  const newOrgEmailDomain = {
    orgId: params.orgId,
    orgName: params.orgName,
    name: params.name,
    orgType: params.orgType
  };

  const emailDomains = org.emailDomains ?? [];
  return {
    ...org,
    emailDomains:
      params.mode === 'create'
        ? [...emailDomains, newOrgEmailDomain]
        : emailDomains.filter(({ name }) => name !== params.name)
  };
};
