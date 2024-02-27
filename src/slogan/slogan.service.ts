import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSloganDto } from './dto/create-slogan.dto';
import { UpdateSloganDto } from './dto/update-slogan.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slogan } from './entities/slogan.entity';

@Injectable()
export class SloganService {

  constructor(
    @InjectRepository(Slogan)
    private readonly sloganRepository: Repository<Slogan>
  ) { }

  create(createSloganDto: CreateSloganDto) {
    const slogan = this.sloganRepository.create(createSloganDto);
    return this.sloganRepository.save(slogan);
  }

  findAll() {
    return this.sloganRepository.find()
  }

  async findOne(): Promise<Slogan> {
    return await this.sloganRepository.query('SELECT * FROM slogan ORDER BY RANDOM() LIMIT 1');
  }

  update(id: number, updateSloganDto: UpdateSloganDto) {
    const slogan = this.sloganRepository.create(updateSloganDto);
    slogan.id = id;
    return this.sloganRepository.save(slogan);
  }

  async remove(id: number) {
    const slogan = await this.sloganRepository.findOne({
      where: { id },
    });

    if (!slogan) {
      throw new NotFoundException(`Voice with ID ${id} not found`);
    }

    await this.sloganRepository.remove(slogan);
    return id
  }
}
