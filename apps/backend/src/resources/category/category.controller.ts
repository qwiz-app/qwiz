import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: Prisma.QuestionCategoryCreateInput) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('/many')
  createMany(
    @Body() createCategoriesDto: Prisma.QuestionCategoryCreateManyInput
  ) {
    return this.categoryService.createMany(createCategoriesDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.QuestionCategoryUncheckedUpdateInput
  ) {
    return this.categoryService.update({ id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove({ id });
  }
}
