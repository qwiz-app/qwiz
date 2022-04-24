import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { UserEntity } from 'common/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  getCurrentUser(@UserEntity() user: User) {
    return user;
  }

  @Post('role')
  async assignRole(
    @Body()
    payload: {
      role: Role;
      data: Prisma.OrganizationCreateInput | Prisma.AttendeeCreateInput;
    },
    @UserEntity() user: User
  ) {
    const { role } = payload;
    const { id } = user;

    if (role === Role.ORGANIZER && 'name' in payload.data) {
      return this.userService.assignRoleAndCreateOrganization(
        { id },
        { ...payload.data }
      );
    }
    if (role === Role.ATTENDEE) {
      return this.userService.assignRoleAndCreateAttendee(
        { id },
        { ...payload.data }
      );
    }
    if (role === Role.ADMIN) {
      return this.userService.update({ id }, { role });
    }

    throw new BadRequestException('Invalid role.');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput
  ) {
    const user = this.userService.update({ id }, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const user = this.userService.remove({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
