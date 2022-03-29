import { Module } from '@nestjs/common';

import { UserModule } from './resources/user/user.module';
import { QuestionModule } from './resources/question/question.module';

@Module({
  imports: [UserModule, QuestionModule],
})
export class AppModule {}
