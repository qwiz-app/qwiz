import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { User } from 'common/decorators/user.decorator';
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
  getCurrentUser(@User() user: UserModel) {
    return user;
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
