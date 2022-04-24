import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from 'app.controller';

import { AuthMiddleware } from 'common/middleware/user.middleware';
import { PrismaService } from 'prisma.service';
import { AttendeeModule } from './resources/attendee/attendee.module';
import { OrganizationModule } from './resources/organization/organization.module';
import { QuestionModule } from './resources/question/question.module';
import { UserModule } from './resources/user/user.module';
import { EventModule } from './resources/event/event.module';
import { QuizModule } from './resources/quiz/quiz.module';

@Module({
  imports: [
    UserModule,
    QuestionModule,
    OrganizationModule,
    AttendeeModule,
    EventModule,
    QuizModule,
  ],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  // TODO: which routes to allow
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // just a placeholder exclude
      .exclude({
        path: '/users',
        method: RequestMethod.GET,
      })
      .forRoutes('*');
  }
}
