import { Account } from '@prisma/client';

export const account: Omit<
  Account,
  'createdBy' | 'createdByUserId' | 'orgs' | 'updatedAt' | 'createdAt'
> = {
  id: '072d0265-dc5d-41da-86b3-8bc081728ad4',
  name: 'Dummy Account'
};
