import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class SlideService {
  constructor(private prisma: PrismaService) {}

  findOne(where: Prisma.QuizSlideWhereUniqueInput, include: Prisma.QuizSlideInclude) {
    return this.prisma.quizSlide.findUnique({ where, include });
  }
}
