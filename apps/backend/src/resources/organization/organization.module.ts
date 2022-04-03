import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { UserService } from 'resources/user/user.service';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService, PrismaService, UserService],
})
export class OrganizationModule {}
