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
import { Organization, Prisma } from '@prisma/client';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(
    @Body() createEventDto: Prisma.EventUncheckedCreateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization
  ) {
    // TODO: i broke it, doesnt work anymore
    console.log('organization :>> ', organization);
    return this.eventService.create({
      ...createEventDto,
      ownerId: organization.id,
    });
  }

  @Get()
  findAll(
    @Query('owner', new DefaultValuePipe(false), ParseBoolPipe) owner: boolean,
    @Query('quiz', new DefaultValuePipe(false), ParseBoolPipe) quiz: boolean
  ) {
    const include = { owner, quiz };
    return this.eventService.findAll(include);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('owner', new DefaultValuePipe(true), ParseBoolPipe) owner: boolean,
    @Query('quiz', new DefaultValuePipe(false), ParseBoolPipe) quiz: boolean,
    @Query('count', new DefaultValuePipe(true), ParseBoolPipe) _count: boolean
  ) {
    const include = { owner, quiz, _count };
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
      { id },
      { ...updateEventDto, ownerId: organization.id }
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove({ id });
  }
}
