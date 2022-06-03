import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Attendee, Prisma } from '@prisma/client';
import { AttendeeEntity } from 'common/decorators/attendee.decorator';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  teamInclude: Prisma.TeamInclude = {
    members: {
      include: {
        user: true,
      },
    },
    admin: {
      include: {
        user: true,
      },
    },
    eventTeams: {
      include: {
        event: true,
      },
    },
    _count: true,
  };

  @Post()
  create(
    @Body()
    {
      members,
      ...createTeamDto
    }: Prisma.TeamUncheckedCreateInput & {
      members?: string[];
    },
    @AttendeeEntity() attendee: Attendee
  ) {
    const otherMembers = members?.map((id) => ({ id })) ?? [];
    const allMembers = [{ id: attendee.id }, ...otherMembers];

    return this.teamService.create(
      {
        ...createTeamDto,
        adminId: attendee.id,
        members: {
          connect: allMembers,
        },
      },
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
  async findOne(@Param('id') id: string) {
    const where: Prisma.TeamWhereUniqueInput = {
      id,
    };
    const team = await this.teamService.findOne(where, this.teamInclude);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
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
