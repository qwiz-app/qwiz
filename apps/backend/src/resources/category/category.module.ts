import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'categories', method: RequestMethod.POST },
        { path: 'categories/many', method: RequestMethod.POST },
        { path: 'categories/:id', method: RequestMethod.PATCH },
        { path: 'categories/:id', method: RequestMethod.DELETE }
      );
  }
}
