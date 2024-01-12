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
    const meditation = this.meditationRepository.create(createMeditationDto);
    console.log(meditation)
    return this.meditationRepository.save(meditation);
  }

  findAll() {
    return this.meditationRepository.find({
      relations: ['categories', 'audios', 'audios.voice']
    });
  }

  update(id: number, updateMeditationDto: UpdateMeditationDto) {
    const meditation = this.meditationRepository.create(updateMeditationDto);
    meditation.id = id;
    return this.meditationRepository.save(meditation);
  }

}
