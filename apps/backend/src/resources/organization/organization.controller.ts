import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from 'resources/user/user.service';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService
  ) {}

  @Post()
  async create(
    @Body() createOrganizationDto: Prisma.OrganizationUncheckedCreateInput
  ) {
    const user = await this.userService.findOne({
      id: createOrganizationDto.userId,
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  findAll(
    @Query('user', new DefaultValuePipe(false), ParseBoolPipe) user: boolean,
    @Query('count', new DefaultValuePipe(true), ParseBoolPipe) _count: boolean
  ) {
    const include: Prisma.OrganizationInclude = {
      user,
      _count,
    };
    return this.organizationService.findAll(include);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('user', new DefaultValuePipe(true), ParseBoolPipe) user: boolean,
    @Query('events', new DefaultValuePipe(false), ParseBoolPipe)
    events: boolean,
    @Query('quizzes', new DefaultValuePipe(false), ParseBoolPipe)
    quizzes: boolean
  ) {
    const include: Prisma.OrganizationInclude = {
      user,
      events,
      quizzes,
      _count: true,
    };
    return this.organizationService.findOne({ id }, include);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: Prisma.OrganizationUpdateInput
  ) {
    return this.organizationService.update({ id }, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove({ id });
  }
}
