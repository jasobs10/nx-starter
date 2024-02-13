import { Org } from '@prisma/client';
import { account } from '../accounts/accounts-seed';

const orgOneId = '072d0265-dc5d-41da-86b3-8bc081728ae6';

const orgTwoId = '072d0265-dc5d-41da-86b3-8bc081728xe2';

export const orgs: Omit<Org, 'createdAt' | 'updatedAt' | 'childOrgs' | 'account' | 'users'>[] = [
  {
    id: orgOneId,
    name: 'Dummy Org One',
    parentOrgId: null,
    accountId: account.id
  },
  {
    id: orgTwoId,
    name: 'Dummy Org Two',
    parentOrgId: orgOneId,
    accountId: account.id
  }
];

export const orgEmailDomains = [
  {
    orgId: orgOneId,
    name: 'gmail.com'
  },
  {
    orgId: orgTwoId,
    name: 'gmail.com'
  }
];
