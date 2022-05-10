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
  UnauthorizedException
} from '@nestjs/common';
import { Organization, Prisma } from '@prisma/client';
import { IsAdmin } from 'common/decorators/admin.decorator';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  private includeWithUserAndCount: Prisma.EventInclude = {
    owner: {
      include: {
        user: true,
      },
    },
    _count: true,
  };

  @Post()
  create(
    @Body() createEventDto: Prisma.EventUncheckedCreateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization
  ) {
    return this.eventService.create({
      ...createEventDto,
      ownerId: organization.id,
    });
  }

  @Get()
  findAll(
    @Query('quiz', new DefaultValuePipe(false), ParseBoolPipe) quiz: boolean
  ) {
    const include = { ...this.includeWithUserAndCount, quiz };

    return this.eventService.findAll({}, include);
  }

  @Get('/owner/me')
  findAllByCurrentOwner(
    @OrganizationEntity() organization: Organization,
    @Query('quiz', new DefaultValuePipe(false), ParseBoolPipe) quiz: boolean
  ) {
    const include = { ...this.includeWithUserAndCount, quiz };
    return this.eventService.findAll({ ownerId: organization.id }, include);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('quiz', new DefaultValuePipe(false), ParseBoolPipe) quiz: boolean
  ) {
    const include = { ...this.includeWithUserAndCount, quiz };
    const event = await this.eventService.findOne({ id }, include);
    if (!event) {
      throw new NotFoundException('Event not found.');
    }
    return event;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: Prisma.EventUncheckedUpdateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization
  ) {
    return this.eventService.update(
      { id, ownerId: organization.id },
      { ...updateEventDto, ownerId: organization.id }
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @OrganizationEntity() organization: Organization
  ) {
    return this.eventService.remove({ id, ownerId: organization.id });
  }

  //* ADMIN-ONLY
  @Delete(':id/any')
  removeAny(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.eventService.remove({ id });
  }
}
