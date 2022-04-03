import { Module } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { AttendeeController } from './attendee.controller';

@Module({
  controllers: [AttendeeController],
  providers: [AttendeeService],
})
export class AttendeeModule {}
