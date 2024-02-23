import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSoundDto } from './dto/create-sound.dto';
import { UpdateSoundDto } from './dto/update-sound.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sound } from './entities/sound.entity';

@Injectable()
export class SoundService {

  constructor(
    @InjectRepository(Sound)
    private readonly soundRepository: Repository<Sound>
  ) { }

  create(createSoundDto: CreateSoundDto) {
    const sound = this.soundRepository.create(createSoundDto);
    return this.soundRepository.save(sound);
  }

  findAll() {
    return this.soundRepository.find()
  }

  update(id: number, updateSoundDto: UpdateSoundDto) {
    const sound = this.soundRepository.create(updateSoundDto);
    sound.id = id;
    return this.soundRepository.save(sound);
  }

  async remove(id: number) {
    const sound = await this.soundRepository.findOne({
      where: { id },
    });

    if (!sound) {
      throw new NotFoundException(`Sound with ID ${id} not found`);
    }

    await this.soundRepository.remove(sound);
    return id
  }
}
