import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { PrismaService } from 'prisma.service';
import { UserService } from 'resources/user/user.service';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService, PrismaService, UserService],
})
export class OrganizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'organizations', method: RequestMethod.POST },
        { path: 'organizations/me', method: RequestMethod.GET },
        { path: 'organizations/me', method: RequestMethod.PATCH },
        { path: 'organizations/me', method: RequestMethod.DELETE },
        { path: 'organizations/:id', method: RequestMethod.DELETE }
      );
  }
}
