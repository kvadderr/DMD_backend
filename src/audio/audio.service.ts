import { Injectable } from '@nestjs/common';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audio } from './entities/audio.entity';

@Injectable()
export class AudioService {

  constructor(
    @InjectRepository(Audio)
    private readonly audioRepository: Repository<Audio>
  ) { }

  async create(createAudioDto: CreateAudioDto) {
    const audio = this.audioRepository.create(createAudioDto);
    await this.audioRepository.save(audio);
    return this.audioRepository.findOne({ where: { id: audio.id }, relations: ['voice'] });
  }

  update(id: number, updateAudioDto: UpdateAudioDto) {
    const audio = this.audioRepository.create(updateAudioDto);
    audio.id = id;
    return this.audioRepository.save(audio);
  }

  async remove(id: number) {
    const audio = await this.audioRepository.findOne({
      where: { id },
    });

    return await this.audioRepository.remove(audio);
  }
}
