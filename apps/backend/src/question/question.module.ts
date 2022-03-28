import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, PrismaService],
})
export class QuestionModule {}
