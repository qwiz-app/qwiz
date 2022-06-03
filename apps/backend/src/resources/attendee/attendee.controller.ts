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
import { UserService } from 'resources/user/user.service';
import { AttendeeService } from './attendee.service';

@Controller('attendees')
export class AttendeeController {
  constructor(
    private readonly attendeeService: AttendeeService,
    private readonly userService: UserService
  ) {}

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
    @Query('teams', new DefaultValuePipe(false), ParseBoolPipe) teams: boolean
  ) {
    const include = {
      adminOfTeams,
      captainOfTeams,
      teams,
    };
    return this.attendeeService.findAll(include);
  }

  @Get('me')
  getCurrentAttendee(@AttendeeEntity() attendee: Attendee) {
    console.log('attendee :>> ', attendee);
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

  @Patch('me')
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

  @Delete('me')
  async removeCurrent(@AttendeeEntity() attendee: Attendee) {
    const deletedAttendee = await this.attendeeService.remove({
      id: attendee.id,
    });
    if (deletedAttendee.userId) {
      await this.userService.update(
        { id: deletedAttendee.userId },
        { role: null }
      );
    }
    return deletedAttendee;
  }

  //* ADMIN-ONLY
  @Delete(':id')
  async remove(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    const deletedAttendee = await this.attendeeService.remove({
      id,
    });
    if (deletedAttendee.userId) {
      await this.userService.update(
        { id: deletedAttendee.userId },
        { role: null }
      );
    }
    return deletedAttendee;
  }
}
