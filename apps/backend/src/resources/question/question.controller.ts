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

  //* ADMIN-ONLY
  @Get('/all')
  findAll(
    @Query('owner', new DefaultValuePipe(false), ParseBoolPipe) owner: boolean,
    @IsAdmin() isAdmin: boolean
  ) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.questionService.findAll({}, { owner });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('owner', new DefaultValuePipe(true), ParseBoolPipe) owner: boolean,
    @OrganizationEntity() organization: Organization
  ) {
    console.log('get question :>> ');
    // only allow personal or global questions
    const question = await this.questionService.findOne(
      {
        id,
        OR: [{ isGlobal: true }, { ownerId: organization.id }],
      },
      { owner }
    );
    if (!question) {
      throw new NotFoundException('Question does not exist.');
    }
    return question;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: Prisma.QuestionUpdateInput,
    @OrganizationEntity() organization: Organization
  ) {
    // can only update personal non-global question
    // TODO: prisma doesnt allow multiple wheres on single update
    // can be done with updateMany but doesnt return updated object
    // can't update personal question if question is global
    return this.questionService.update(
      {
        id,
        ownerId: organization.id,
        isGlobal: false,
      },
      updateQuestionDto
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @OrganizationEntity() organization: Organization
  ) {
    // can only delete personal non-global question
    // TODO: prisma doesnt allow multiple wheres on single update
    // can be done with deleteMany but doesnt return deleted object
    // can't update personal question if question is global
    return this.questionService.remove({
      id,
      ownerId: organization.id,
      isGlobal: false,
    });
  }

  //* ADMIN-ONLY
  @Get(':id/any')
  async findAny(
    @Param('id') id: string,
    @Query('owner', new DefaultValuePipe(true), ParseBoolPipe) owner: boolean,
    @IsAdmin() isAdmin: boolean
  ) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    const question = await this.questionService.findOne({ id }, { owner });
    if (!question) {
      throw new NotFoundException('Question does not exist.');
    }
    return question;
  }

  //* ADMIN-ONLY
  @Patch(':id/any')
  updateAny(
    @Param('id') id: string,
    @Body() updateQuestionDto: Prisma.QuestionUpdateInput,
    @IsAdmin() isAdmin: boolean
  ) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.questionService.update({ id }, updateQuestionDto);
  }

  //* ADMIN-ONLY
  @Delete(':id/any')
  removeAny(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.questionService.remove({ id });
  }
}
