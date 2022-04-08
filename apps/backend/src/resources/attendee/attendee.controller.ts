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
import { AttendeeService } from './attendee.service';

@Controller('attendees')
export class AttendeeController {
  constructor(
    private readonly attendeeService: AttendeeService,
    private readonly userService: UserService
  ) {}

  @Post()
  async create(@Body() createAttendeeDto: Prisma.AttendeeUncheckedCreateInput) {
    // TODO: check if user id exists - is there a betterr way?
    // TODO: also check if he is eligble to be an attendee
    // put into reusable methods used across resources
    // or put into middleware?
    const user = await this.userService.findOne({
      id: createAttendeeDto.userId,
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return this.attendeeService.create(createAttendeeDto);
  }

  @Get()
  findAll(
    @Query('user', new DefaultValuePipe(false), ParseBoolPipe) user: boolean,
    @Query('adminOfTeams', new DefaultValuePipe(false), ParseBoolPipe)
    adminOfTeams: boolean,
    @Query('captainOfTeams', new DefaultValuePipe(false), ParseBoolPipe)
    captainOfTeams: boolean,
    @Query('teams', new DefaultValuePipe(false), ParseBoolPipe) teams: boolean,
    @Query('count', new DefaultValuePipe(true), ParseBoolPipe) _count: boolean
  ) {
    const include: Prisma.AttendeeInclude = {
      user,
      adminOfTeams,
      captainOfTeams,
      teams,
      _count,
    };
    return this.attendeeService.findAll(include);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('user', new DefaultValuePipe(true), ParseBoolPipe) user: boolean,
    @Query('adminOfTeams', new DefaultValuePipe(false), ParseBoolPipe)
    adminOfTeams: boolean,
    @Query('captainOfTeams', new DefaultValuePipe(false), ParseBoolPipe)
    captainOfTeams: boolean,
    @Query('teams', new DefaultValuePipe(false), ParseBoolPipe) teams: boolean
  ) {
    const include: Prisma.AttendeeInclude = {
      user,
      adminOfTeams,
      captainOfTeams,
      teams,
      _count: true,
    };
    return this.attendeeService.findOne({ id }, include);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendeeDto: Prisma.AttendeeUpdateInput
  ) {
    return this.attendeeService.update({ id }, updateAttendeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendeeService.remove({ id });
  }
}
