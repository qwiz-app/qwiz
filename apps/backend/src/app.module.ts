import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [UserModule, QuestionModule],
})
export class AppModule {}
