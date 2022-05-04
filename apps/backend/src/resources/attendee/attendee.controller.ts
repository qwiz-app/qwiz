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
import { Attendee, Prisma, User } from '@prisma/client';
import { IsAdmin } from 'common/decorators/admin.decorator';
import { AttendeeEntity } from 'common/decorators/attendee.decorator';
import { UserEntity } from 'common/decorators/user.decorator';
import { AttendeeService } from './attendee.service';

@Controller('attendees')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Post()
  async create(
    @UserEntity() user: User,
    @Body() createAttendeeDto: Prisma.AttendeeCreateWithoutUserInput
  ) {
    return this.attendeeService.create({
      ...createAttendeeDto,
      userId: user.id,
    });
  }

  @Get()
  findAll(
    @Query('adminOfTeams', new DefaultValuePipe(false), ParseBoolPipe)
    adminOfTeams: boolean,
    @Query('captainOfTeams', new DefaultValuePipe(false), ParseBoolPipe)
    captainOfTeams: boolean,
    @Query('teams', new DefaultValuePipe(false), ParseBoolPipe) teams: boolean,
    @Query('count', new DefaultValuePipe(true), ParseBoolPipe) _count: boolean
  ) {
    const include = {
      user: true,
      adminOfTeams,
      captainOfTeams,
      teams,
      _count,
    };
    return this.attendeeService.findAll(include);
  }

  @Get('me')
  getCurrentAttendee(@AttendeeEntity() attendee: Attendee) {
    if (!attendee) {
      throw new NotFoundException('Attendee does not exist.');
    }
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
    const include = {
      user,
      adminOfTeams,
      captainOfTeams,
      teams,
      _count: true,
    };

    const attendee = await this.attendeeService.findOne({ id }, include);

    if (!attendee) {
      throw new NotFoundException('Attendee does not exist.');
    }
    return attendee;
  }

  @Patch(':id')
  updateCurrent(
    @Body() updateAttendeeDto: Prisma.AttendeeUpdateInput,
    @AttendeeEntity() attendee: Attendee,
    @UserEntity() user: User
  ) {
    return this.attendeeService.update(
      { id: attendee.id },
      { ...updateAttendeeDto, userId: user.id }
    );
  }

  @Delete(':id')
  removeCurrent(@AttendeeEntity() attendee: Attendee) {
    // TODO: delete user role
    return this.attendeeService.remove({ id: attendee.id });
  }

  //* ADMIN-ONLY
  @Delete(':id')
  remove(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.attendeeService.remove({ id });
  }
}
