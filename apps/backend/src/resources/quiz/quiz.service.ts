import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  create(createQuizDto: any) {
    return 'This action adds a new quiz';
  }

  findAll() {
    return `This action returns all quiz`;
  }

  findOne(id: string) {
    return `This action returns a #${id} quiz`;
  }

  update(id: string, updateQuizDto: any) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: string) {
    return `This action removes a #${id} quiz`;
  }
}
