import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'common/middleware/user.middleware';
import { PrismaService } from 'prisma.service';
import { AWSController } from './aws.controller';
import { AWSService } from './aws.service';

@Module({
  controllers: [AWSController],
  providers: [AWSService, PrismaService],
})
export class AWSModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AWSController);
  }
}
