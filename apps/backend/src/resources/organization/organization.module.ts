import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { UserService } from 'resources/user/user.service';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService, PrismaService, UserService],
})
export class OrganizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(OrganizationController);
  }
}
