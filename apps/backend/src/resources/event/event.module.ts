import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { PrismaService } from 'prisma.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'events', method: RequestMethod.POST },
        { path: 'events/:id', method: RequestMethod.PATCH },
        { path: 'events/:id', method: RequestMethod.DELETE },
        { path: 'events/:id/any', method: RequestMethod.DELETE },
        { path: 'events/owner/me', method: RequestMethod.GET }
      );
  }
}
