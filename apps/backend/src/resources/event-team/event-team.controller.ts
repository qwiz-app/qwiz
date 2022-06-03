import {
  Body, Controller, Delete, Param, Post
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventTeamService } from './event-team.service';

@Controller('event-team')
export class EventTeamController {
  constructor(private readonly eventTeamService: EventTeamService) {}

  @Post()
  create(@Body() createEventTeamDto: Prisma.EventTeamUncheckedCreateInput) {
    return this.eventTeamService.create(createEventTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTeamService.remove({ id });
  }
}
