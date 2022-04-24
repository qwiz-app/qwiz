import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { Organization, Prisma } from '@prisma/client';
import { IsAdmin } from 'common/decorators/admin.decorator';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(
    @Body() createQuestionDto: Prisma.QuestionCreateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization,
    @IsAdmin() isAdmin: boolean
  ) {
    // question is global by default if made by admin
    const orgId = organization?.id ?? null;
    return this.questionService.create({
      ...createQuestionDto,
      isGlobal: isAdmin,
      ownerId: isAdmin ? null : orgId,
    });
  }

  // Active questions which are either our own or global
  @Get('')
  findAvailable(@OrganizationEntity() organization: Organization) {
    const where: Prisma.QuestionWhereInput = {
      isActive: true,
      OR: [{ isGlobal: true }, { ownerId: organization.id }],
    };
    return this.questionService.findAvailable(where);
  }

  @Get('/all')
  findAll(@IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.questionService.findAll({});
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('owner', new DefaultValuePipe(false), ParseBoolPipe) owner: boolean
  ) {
    const question = await this.questionService.findOne({ id }, { owner });
    if (!question) {
      throw new NotFoundException('Question does not exist.');
    }
    return question;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: Prisma.QuestionUpdateInput
  ) {
    // TODO: handle admin access for global questions
    return this.questionService.update({ id }, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // TODO: handle admin access for global questions
    return this.questionService.remove({ id });
  }
}
