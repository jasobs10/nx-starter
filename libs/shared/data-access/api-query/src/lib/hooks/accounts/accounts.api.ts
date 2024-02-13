import { useQueryClient } from '@tanstack/react-query';
import { UseApiMutationOptions, UseApiQueryOptions } from '../../types';
import { useApiMutation } from '../../use-api-mutation';
import { AccountDto, OrgDto } from '@revision/shared/data-access/api-types';
import { useApiQuery } from '../../use-api-query';
import { ORGS_ENDPOINT } from '../orgs/orgs.api';

export type OrgDetails = OrgDto & { parentDistrictName?: string };

export const ACCOUNTS_ENDPOINT = 'accounts';
export const useAccountsApiQuery = (options?: UseApiQueryOptions<AccountDto[]>) =>
  useApiQuery(ACCOUNTS_ENDPOINT, options);

export const makeAccountEndpoint = (accountId: string | undefined) =>
  accountId ? `${ACCOUNTS_ENDPOINT}/${accountId}` : undefined;
export const useAccountApiQuery = (
  accountId: string | undefined,
  options?: UseApiQueryOptions<AccountDto & { schools: OrgDetails[] }>
) =>
  useApiQuery(makeAccountEndpoint(accountId), { ...options, select: selectAccountWithSchoolsData });

export const ACCOUNTS_IMPORT_ENDPOINT = `${ACCOUNTS_ENDPOINT}/import`;
export const useAccountsImportApiMutation = (options?: UseApiMutationOptions<FormData>) => {
  const queryClient = useQueryClient();
  return useApiMutation(ACCOUNTS_IMPORT_ENDPOINT, {
    ...options,
    isFile: true,
    onSuccess: (...config) => {
      options?.onSuccess?.(...config);
      queryClient.invalidateQueries({ queryKey: [ACCOUNTS_ENDPOINT] });
      queryClient.invalidateQueries({ queryKey: [ORGS_ENDPOINT] });
    }
  });
};

const selectAccountWithSchoolsData = (
  account: AccountDto
): AccountDto & { schools: OrgDetails[] } => {
  if (!account.orgs) return { ...account, schools: [] };

  const districtById = account.orgs
    .filter(({ orgType }) => orgType === OrgType.District)
    .reduce<
      Record<string, OrgDto>
    >((accum, district) => ({ ...accum, [district.id]: district }), {});

  return {
    ...account,
    schools: account.orgs
      .filter(({ orgType }) => orgType === OrgType.School)
      .map((school) => ({
        ...school,
        parentDistrictName: districtById[school.parentOrgId ?? '']?.name
      }))
  };
};
