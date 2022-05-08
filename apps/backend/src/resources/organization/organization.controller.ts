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
  UnauthorizedException,
} from '@nestjs/common';
import { Organization, Prisma, User } from '@prisma/client';
import { IsAdmin } from 'common/decorators/admin.decorator';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { UserEntity } from 'common/decorators/user.decorator';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async create(
    @Body() createOrganizationDto: Prisma.OrganizationCreateWithoutUserInput,
    @UserEntity() user: User
  ) {
    return this.organizationService.create({
      ...createOrganizationDto,
      userId: user.id,
    });
  }

  @Get()
  findAll() {
    const include = {
      user: true,
      _count: true,
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
    const include = {
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
      throw new NotFoundException('Organization does not exist.');
    }
    return organization;
  }

  @Patch('me')
  updateCurrent(
    @Body()
    updateOrganizationDto: Prisma.OrganizationUpdateInput,
    @OrganizationEntity() organization: Organization,
    @UserEntity() user: User
  ) {
    return this.organizationService.update(
      { id: organization.id },
      { ...updateOrganizationDto, userId: user.id }
    );
  }

  @Delete('me')
  removeCurrent(@OrganizationEntity() organization: Organization) {
    // TODO: delete user role
    return this.organizationService.remove({ id: organization.id });
  }

  //* ADMIN-ONLY
  @Delete(':id')
  remove(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.organizationService.remove({ id });
  }
}
