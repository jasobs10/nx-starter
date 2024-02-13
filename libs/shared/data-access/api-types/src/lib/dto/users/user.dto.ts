import { SystemRole } from '@prisma/client';
import { IsIn } from 'class-validator';

export class UserDto {
  id: string;

  givenName: string;

  familyName: string;

  username: string;

  primaryOrgId?: string | null;

  primaryOrgName?: string | null;

  /**
   * @example ['SystemAdmin']
   */
  @IsIn(Object.values(SystemRole), { each: true })
  roles: SystemRole[];
}
