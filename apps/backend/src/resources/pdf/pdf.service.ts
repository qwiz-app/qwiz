import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma.service';

@Injectable()
export class PdfService {
  constructor(private prisma: PrismaService) {}

  findOne(where: Prisma.QuizWhereUniqueInput) {
    return this.prisma.quiz.findUnique({
      where,
      include: {
      slides: {
          include: {
            quizQuestion: {
              include: {
                question: {
                  include: {
                    contents: true,
                  }
                },
              },
            },
          },
        },
      },
    });
  }
}
