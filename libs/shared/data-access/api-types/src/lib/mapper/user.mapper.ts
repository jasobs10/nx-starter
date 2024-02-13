import { Org, User } from '@prisma/client';
import { UserDto } from '../dto';

export const mapUserToUserDto = (user: User & { primaryOrg?: Org | null }): UserDto => {
  const { id, givenName, familyName, username, roles, primaryOrgId, primaryOrg } = user;
  return {
    id,
    givenName,
    familyName,
    username,
    roles,
    primaryOrgId,
    primaryOrgName: primaryOrg?.name
  };
};

export const mapUsersToUserDtos = (users: User[]): UserDto[] => users.map(mapUserToUserDto);
