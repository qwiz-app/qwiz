import { Module } from '@nestjs/common';

import { UserModule } from './resources/user/user.module';
import { QuestionModule } from './resources/question/question.module';
import { OrganizationModule } from './resources/organization/organization.module';
import { AttendeeModule } from './resources/attendee/attendee.module';

@Module({
  imports: [UserModule, QuestionModule, OrganizationModule, AttendeeModule],
})
export class AppModule {}
