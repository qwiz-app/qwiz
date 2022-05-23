import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { PrismaService } from 'prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: '/users',
        method: RequestMethod.GET,
      })
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/me', method: RequestMethod.GET },
        { path: 'users/me', method: RequestMethod.PATCH },
        { path: 'users/me', method: RequestMethod.DELETE },
        { path: 'users/:id', method: RequestMethod.PATCH },
        { path: 'users/:id', method: RequestMethod.DELETE },
        { path: 'users/assign-role', method: RequestMethod.POST }
      );
  }
}
