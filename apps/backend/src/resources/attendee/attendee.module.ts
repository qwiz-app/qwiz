import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { PrismaService } from 'prisma.service';
import { UserService } from 'resources/user/user.service';
import { AttendeeController } from './attendee.controller';
import { AttendeeService } from './attendee.service';

@Module({
  controllers: [AttendeeController],
  providers: [AttendeeService, PrismaService, UserService],
})
export class AttendeeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AttendeeController);
  }
}
