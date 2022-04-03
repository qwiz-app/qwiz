import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { UserService } from 'resources/user/user.service';
import { AttendeeController } from './attendee.controller';
import { AttendeeService } from './attendee.service';

@Module({
  controllers: [AttendeeController],
  providers: [AttendeeService, PrismaService, UserService],
})
export class AttendeeModule {}
