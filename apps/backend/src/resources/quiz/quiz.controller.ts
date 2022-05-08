import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Organization, Prisma } from '@prisma/client';
import { IsAdmin } from 'common/decorators/admin.decorator';
import { OrganizationEntity } from 'common/decorators/organization.decorator';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  private includeWithUserAndCount: Prisma.QuizInclude = {
    owner: {
      include: {
        user: true,
      },
    },
    _count: true,
  };

  @Post()
  create(
    @Body() createQuizDto: Prisma.QuizCreateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization
  ) {
    return this.quizService.create({
      ...createQuizDto,
      ownerId: organization.id,
    });
  }

  //* ADMIN-ONLY
  @Get()
  findAll(@IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.quizService.findAll({}, this.includeWithUserAndCount);
  }

  @Get('/owner/me')
  findAllByCurrentOwner(@OrganizationEntity() organization: Organization) {
    return this.quizService.findAll(
      { ownerId: organization.id },
      this.includeWithUserAndCount
    );
  }

  //* ADMIN-ONLY
  @Get('/owner/:id')
  findAllByOwner(@Param('id') ownerId: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.quizService.findAll({ ownerId }, this.includeWithUserAndCount);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quiz = await this.quizService.findOne(
      { id },
      this.includeWithUserAndCount
    );
    if (!quiz) {
      throw new NotFoundException('Quiz not found.');
    }
    return quiz;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: Prisma.QuizUncheckedUpdateWithoutOwnerInput,
    @OrganizationEntity() organization: Organization
  ) {
    return this.quizService.update(
      { id },
      { ...updateQuizDto, ownerId: organization.id }
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @OrganizationEntity() organization: Organization
  ) {
    return this.quizService.remove({ id, ownerId: organization.id });
  }

  @Post('thumbnail')
  createThumbnail(
    @Body()
    payload: {
      url: string;
      size: {
        width: number;
        height: number;
      };
    }
  ) {
    const { url, size } = payload;

    return this.quizService.createThumbnail(url, size);
  }

  //* ADMIN-ONLY
  @Delete(':id/any')
  removeAny(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    if (!isAdmin) {
      throw new UnauthorizedException('Only admin can access this route.');
    }
    return this.quizService.remove({ id });
  }
}
