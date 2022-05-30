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

  includeContentAndOwnerAndCategoriesAndMode: Prisma.QuestionInclude = {
    contents: true,
    owner: {
      include: {
        user: {
          select: {
            image: true,
          },
        },
      },
    },
    // questionMode: true,
    categories: true,
    _count: true,
  };

  @Post()
  create(
    @Body()
    {
      contents,
      categories,
      ...createQuestionDto
    }: Prisma.QuestionCreateInput & {
      contents: Prisma.QuestionContentCreateWithoutQuestionInput[];
      categories?: string[];
    },
    @OrganizationEntity() organization: Organization,
    @IsAdmin() isAdmin: boolean
  ) {
    // question is global by default if made by admin
    const orgId = organization?.id ?? null;

    const data: Prisma.QuestionUncheckedCreateInput = {
      ...createQuestionDto,
      isGlobal: isAdmin,
      ownerId: isAdmin ? null : orgId,
      contents: {
        create: contents,
      },
      categories: {
        connect: categories?.map((id) => ({ id })),
      },
    };
    const include = this.includeContentAndOwnerAndCategoriesAndMode;
    return this.questionService.create(data, include);
  }

  // Active questions which are either our own or global
  @Get('')
  findAvailable(@OrganizationEntity() organization: Organization) {
    const where = {
      isActive: true,
      OR: [{ isGlobal: true }, { ownerId: organization.id }],
    };
    const include = {
      ...this.includeContentAndOwnerAndCategoriesAndMode,
    };

    return this.questionService.findAvailable(where, include);
  }

  @Get('/me')
  findAllByMe(@OrganizationEntity() organization: Organization) {
    const where = {
      ownerId: organization.id,
    };
    const include = {
      ...this.includeContentAndOwnerAndCategoriesAndMode,
    };

    return this.questionService.findAvailable(where, include);
  }

  //* ADMIN-ONLY
  @Get('/all')
  findAll(
    @Query('owner', new DefaultValuePipe(false), ParseBoolPipe) owner: boolean,
    @Query('questionMode', new DefaultValuePipe(false), ParseBoolPipe)
    questionMode: boolean,
    @IsAdmin() isAdmin: boolean
  ) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    const where = {};
    const include = this.includeContentAndOwnerAndCategoriesAndMode;

    return this.questionService.findAll(where, include);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('owner', new DefaultValuePipe(true), ParseBoolPipe) owner: boolean,
    @Query('questionMode', new DefaultValuePipe(true), ParseBoolPipe)
    questionMode: boolean,
    @OrganizationEntity() organization: Organization
  ) {
    const where = {
      id,
      OR: [{ isGlobal: true }, { ownerId: organization.id }],
    };
    const include = this.includeContentAndOwnerAndCategoriesAndMode;
    const question = await this.questionService.findOne(where, include);

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
    const where = {
      id,
      ownerId: organization.id,
      isGlobal: false,
    };
    // TODO: prisma doesnt allow multiple conditions on single update
    // so must be done with updateMany - doesnt return updated object
    return this.questionService.update(where, updateQuestionDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @OrganizationEntity() organization: Organization
  ) {
    // TODO: prisma doesnt allow multiple conditions on single delete
    // so must be done with deleteMany - doesnt return deleted object
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
    @Query('owner', new DefaultValuePipe(false), ParseBoolPipe) owner: boolean,
    @Query('questionMode', new DefaultValuePipe(false), ParseBoolPipe)
    questionMode: boolean,
    @IsAdmin() isAdmin: boolean
  ) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }

    const include = { owner, questionMode };

    const question = await this.questionService.findOne({ id }, include);

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
