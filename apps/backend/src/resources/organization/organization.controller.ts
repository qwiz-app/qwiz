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
    @Query('quizzes', new DefaultValuePipe(false), ParseBoolPipe)
    quizzes: boolean,
    @Query('questions', new DefaultValuePipe(false), ParseBoolPipe)
    questions: boolean
  ) {
    const include: Prisma.OrganizationInclude = {
      user: true,
      events: true,
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
  async removeCurrent(@OrganizationEntity() organization: Organization) {
    const deletedOrganization = await this.organizationService.remove({
      id: organization.id,
    });
    if (deletedOrganization.userId) {
      await this.userService.update(
        { id: deletedOrganization.userId },
        { role: null }
      );
    }
    return deletedOrganization;
  }

  //* ADMIN-ONLY
  @Delete(':id')
  async remove(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    const deletedOrganization = await this.organizationService.remove({
      id,
    });
    if (deletedOrganization.userId) {
      await this.userService.update(
        { id: deletedOrganization.userId },
        { role: null }
      );
    }
    return deletedOrganization;
  }
}
