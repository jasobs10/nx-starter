import { SystemRole, User } from '@prisma/client';
import { orgs } from '../orgs/orgs-seed';

export const users: Omit<User, 'createdAccounts' | 'createdAt' | 'updatedAt'>[] = [
  {
    id: '072d0265-dc5d-41da-86b3-8bc081728ae6',
    givenName: 'Dummy',
    familyName: 'User',
    username: 'dummyuser@example.com',
    roles: [SystemRole.User],
    primaryOrgId: null
  },
  {
    id: 'c8d978aa-91f9-440d-86d6-b968053a244c',
    givenName: 'Admin',
    familyName: 'User',
    username: 'dummyadmin@example.com',
    roles: [SystemRole.SystemAdmin],
    primaryOrgId: orgs[0].id
  },
  {
    id: 'c8d978aa-91f9-440d-86d6-b968053a244f',
    givenName: 'Admin/User',
    familyName: 'User',
    username: 'dummyadminuser@example.com',
    roles: [SystemRole.User, SystemRole.SystemAdmin],
    primaryOrgId: orgs[1].id
  }
];
