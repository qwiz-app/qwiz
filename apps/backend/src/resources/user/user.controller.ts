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
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { IsAdmin } from 'common/decorators/admin.decorator';
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

  @Post('assign-role')
  async assignRole(
    @Body()
    payload: {
      role: Role;
      data: Prisma.OrganizationCreateInput | Prisma.AttendeeCreateInput;
      image?: string;
    },
    @UserEntity() user: User
  ) {
    const { role, image } = payload;
    const { id } = user;

    if (role === Role.ORGANIZATION && 'name' in payload.data) {
      return this.userService.assignRoleAndCreateOrganization(
        { id },
        { ...payload.data },
        { image }
      );
    }
    if (role === Role.ATTENDEE) {
      return this.userService.assignRoleAndCreateAttendee(
        { id },
        { ...payload.data },
        { image }
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

  // TODO: dont allow changing roles
  @Patch('me')
  updateCurrent(
    @Body() updateUserDto: Prisma.UserUpdateInput,
    @UserEntity() user: User
  ) {
    return this.userService.update({ id: user.id }, updateUserDto);
  }

  //* ADMIN-ONLY
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
    @IsAdmin() isAdmin: boolean
  ) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    const user = this.userService.update({ id }, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Delete('me')
  removeCurrent(@UserEntity() user: User) {
    return this.userService.remove({ id: user.id });
  }

  //* ADMIN-ONLY
  @Delete(':id')
  remove(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    const user = this.userService.remove({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
