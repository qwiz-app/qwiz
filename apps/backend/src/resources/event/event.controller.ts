import {
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
import { Organization, Prisma } from '@prisma/client';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(
    @OrganizationEntity() organization: Organization,
    @Body() createEventDto: Prisma.EventUncheckedCreateWithoutOwnerInput
  ) {
    return this.eventService.create({
      ...createEventDto,
      ownerId: organization.id,
    });
  }

  @Get()
  findAll(
    @Query('owner', new DefaultValuePipe(false), ParseBoolPipe) owner: boolean,
    @Query('quiz', new DefaultValuePipe(false), ParseBoolPipe) quiz: boolean,
    @Query('count', new DefaultValuePipe(true), ParseBoolPipe) _count: boolean
  ) {
    const include: Prisma.EventInclude = {
      owner,
      quiz,
      _count,
    };
    return this.eventService.findAll(include);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('owner', new DefaultValuePipe(true), ParseBoolPipe) owner: boolean,
    @Query('quiz', new DefaultValuePipe(false), ParseBoolPipe) quiz: boolean,
    @Query('count', new DefaultValuePipe(true), ParseBoolPipe) _count: boolean
  ) {
    const include: Prisma.EventInclude = {
      owner,
      quiz,
      _count,
    };
    return this.eventService.findOne({ id }, include);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @OrganizationEntity() organization: Organization,
    @Body() updateEventDto: Prisma.EventUncheckedUpdateInput
  ) {
    return this.eventService.update(
      { id },
      { ...updateEventDto, ownerId: organization.id }
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove({ id });
  }
}
