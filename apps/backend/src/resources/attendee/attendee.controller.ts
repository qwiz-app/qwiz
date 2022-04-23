import {
  BadRequestException,
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
import { Attendee as AttendeeModel, Prisma } from '@prisma/client';
import { Attendee } from 'common/decorators/attendee.decorator';
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
    // TODO: check if user id exists - is there a better way?
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

  // TODO: not working
  @Get('me')
  getCurrentAttendee(@Attendee() attendee: AttendeeModel) {
    return attendee;
  }

  @Get(':id')
  async findOne(
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

    const attendee = await this.attendeeService.findOne({ id }, include);

    if (!attendee) {
      throw new NotFoundException('Attendee does not exist');
    }
    return attendee;
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
