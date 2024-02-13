import { UserDto, mapUserToUserDto, mapUsersToUserDtos } from '@jasobs10/api-types';
import { PrismaService } from '@jasobs10/prisma';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all users
   */
  @Get()
  async getUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();

    return mapUsersToUserDtos(users);
  }

  /**
   * Get one user
   */
  @Get(':userId')
  @ApiNotFoundResponse({ description: 'User does not exist' })
  async getUser(@Param('userId') userId: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException();
    }

    return mapUserToUserDto(user);
  }
}
