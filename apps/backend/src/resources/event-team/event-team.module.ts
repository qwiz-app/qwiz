import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { PrismaService } from 'prisma.service';
import {
  EventTeamController
} from './event-team.controller';
import { EventTeamService } from './event-team.service';

@Module({
  controllers: [EventTeamController],
  providers: [EventTeamService, PrismaService],
})
export class EventTeamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'event-team', method: RequestMethod.POST },
        { path: 'event-team/:id', method: RequestMethod.DELETE }
      );
  }
}
