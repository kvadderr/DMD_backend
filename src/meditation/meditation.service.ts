import { Injectable } from '@nestjs/common';
import { CreateMeditationDto } from './dto/create-meditation.dto';
import { UpdateMeditationDto } from './dto/update-meditation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meditation } from './entities/meditation.entity';
@Injectable()
export class MeditationService {

  constructor(
    @InjectRepository(Meditation)
    private readonly meditationRepository: Repository<Meditation>
  ) { }

  create(createMeditationDto: CreateMeditationDto) {
    console.log(createMeditationDto)
    const meditation = this.meditationRepository.create(createMeditationDto);
    return this.meditationRepository.save(createMeditationDto);
  }

  findAll() {
    return this.meditationRepository.find({
      relations: ['categories', 'audios']
    });
  }

  update(id: number, updateMeditationDto: UpdateMeditationDto) {
    return `This action updates a #${id} meditation`;
  }

}
