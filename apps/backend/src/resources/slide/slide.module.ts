import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { SlideController } from './slide.controller';
import { SlideService } from './slide.service';

@Module({
  controllers: [SlideController],
  providers: [SlideService, PrismaService],
})
export class SlideModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(SlideController);
  }
}
