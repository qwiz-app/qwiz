import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';

@Controller('attendee')
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Post()
  create(@Body() createAttendeeDto: CreateAttendeeDto) {
    return this.attendeeService.create(createAttendeeDto);
  }

  @Get()
  findAll() {
    return this.attendeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendeeDto: UpdateAttendeeDto
  ) {
    return this.attendeeService.update(+id, updateAttendeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendeeService.remove(+id);
  }
}
