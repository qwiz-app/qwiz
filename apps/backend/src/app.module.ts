import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from 'app.controller';
import { PrismaService } from 'prisma.service';
import { AWSModule } from 'resources/aws/aws.module';
import { QuizQuestionModule } from 'resources/quiz-question/quiz-question.module';
import { SlideModule } from 'resources/slide/slide.module';
import { AttendeeModule } from './resources/attendee/attendee.module';
import { EventModule } from './resources/event/event.module';
import { OrganizationModule } from './resources/organization/organization.module';
import { QuestionModule } from './resources/question/question.module';
import { QuizModule } from './resources/quiz/quiz.module';
import { UserModule } from './resources/user/user.module';
import { CategoryModule } from './resources/category/category.module';
import { TeamModule } from './resources/team/team.module';

@Module({
  imports: [
    UserModule,
    QuestionModule,
    OrganizationModule,
    AttendeeModule,
    EventModule,
    QuizModule,
    AWSModule,
    SlideModule,
    QuizQuestionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        AWS_BUCKET_ACCESS_KEY: Joi.string().required(),
        AWS_BUCKET_SECRET_KEY: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        AWS_BUCKET_REGION: Joi.string().required(),
        AWS_BUCKET_URL: Joi.string().required(),
      }),
    }),
    CategoryModule,
    TeamModule,
  ],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}
