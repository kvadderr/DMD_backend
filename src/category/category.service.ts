import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['meditations', 'audios', 'audios.voice']
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryRepository.create(updateCategoryDto);
    category.id = id;
    return this.categoryRepository.save(category);
  }


  async remove(id: number) {
    const voice = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!voice) {
      throw new NotFoundException(`Voice with ID ${id} not found`);
    }

    await this.categoryRepository.remove(voice);
    return id
  }
}
