import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Organization, Prisma, User } from '@prisma/client';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { UserEntity } from 'common/decorators/user.decorator';
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
    @UserEntity() user: User,
    @Body() createOrganizationDto: Prisma.OrganizationCreateWithoutUserInput
  ) {
    return this.organizationService.create({
      ...createOrganizationDto,
      userId: user.id,
    });
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

  @Get('me')
  getCurrentOrganization(@OrganizationEntity() organization: Organization) {
    if (!organization) {
      throw new NotFoundException('Organization does not exist.');
    }
    return organization;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('events', new DefaultValuePipe(false), ParseBoolPipe)
    events: boolean,
    @Query('quizzes', new DefaultValuePipe(false), ParseBoolPipe)
    quizzes: boolean,
    @Query('questions', new DefaultValuePipe(false), ParseBoolPipe)
    questions: boolean
  ) {
    const include: Prisma.OrganizationInclude = {
      user: true,
      events,
      quizzes,
      questions,
      _count: true,
    };

    const organization = await this.organizationService.findOne(
      { id },
      include
    );

    if (!organization) {
      throw new NotFoundException('Organization does not exists.');
    }
    return organization;
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
