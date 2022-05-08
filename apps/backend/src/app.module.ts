import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from 'app.controller';
import { PrismaService } from 'prisma.service';
import { AWSModule } from 'resources/aws/aws.module';
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
    AWSModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
