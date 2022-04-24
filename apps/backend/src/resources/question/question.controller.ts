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
  Query
} from '@nestjs/common';
import { Organization, Prisma } from '@prisma/client';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(
    @Body() createQuestionDto: Prisma.QuestionCreateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization
    // TODO: isAdmin middleware
  ) {
    return this.questionService.create({
      ...createQuestionDto,
      // TODO: set global if made by admin
      isGlobal: false,
      ownerId: organization?.id ?? null,
    });
  }

  // Global and active questions
  // option of including our custom questions
  @Get('')
  findAvailable(@OrganizationEntity() organization: Organization) {
    // TODO: handle admin access
    // TODO: check if I am the owner organization of the question (user's organization from middleware) or admin
    // cant do it now cos postman isnt yet configured to handle middleware
    const where: Prisma.QuestionWhereInput = {
      isActive: true,
      OR: [{ isGlobal: true }, { ownerId: organization.id }],
    };
    return this.questionService.findAvailable(where);
  }

  // TODO: only admin has access
  @Get('/all')
  findAll() {
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
    return this.questionService.update({ id }, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove({ id });
  }
}
