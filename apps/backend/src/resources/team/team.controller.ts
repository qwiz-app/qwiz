import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Attendee, Prisma } from '@prisma/client';
import { AttendeeEntity } from 'common/decorators/attendee.decorator';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  teamInclude: Prisma.TeamInclude = {
    members: true,
    eventTeams: {
      include: {
        event: true,
      },
    },
    _count: true,
  };

  @Post()
  create(
    @Body() createTeamDto: Prisma.TeamUncheckedCreateInput,
    @AttendeeEntity() attendee: Attendee
  ) {
    return this.teamService.create(
      { ...createTeamDto, adminId: attendee.id },
      this.teamInclude
    );
  }

  @Get()
  findAll(@AttendeeEntity() attendee: Attendee) {
    const where: Prisma.TeamWhereInput = {
      adminId: attendee.id,
    };
    return this.teamService.findAll(where, this.teamInclude);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const where: Prisma.TeamWhereUniqueInput = {
      id,
    };
    return this.teamService.findOne(where, this.teamInclude);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AttendeeEntity() attendee: Attendee) {
    const where: Prisma.TeamWhereInput = {
      adminId: attendee.id,
      id,
    };
    return this.teamService.remove(where);
  }
}
