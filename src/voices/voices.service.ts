import { Injectable } from '@nestjs/common';
import { CreateVoiceDto } from './dto/create-voice.dto';
import { UpdateVoiceDto } from './dto/update-voice.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voice } from './entities/voice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VoicesService {

  constructor(
    @InjectRepository(Voice)
    private readonly voiceRepository: Repository<Voice>
  ) { }

  create(createVoiceDto: CreateVoiceDto) {
    const voice = this.voiceRepository.create(createVoiceDto);
    return this.voiceRepository.save(voice);
  }

  findAll(): Promise<Voice[]> {
    return this.voiceRepository.find({
      relations: ['audios']
    });
  }

  update(id: number, updateVoiceDto: UpdateVoiceDto) {
    const voice = this.voiceRepository.create(updateVoiceDto);
    voice.id = id;
    return this.voiceRepository.save(voice);
  }

  async remove(id: number) {
    const voice = await this.voiceRepository.findOne({
      where: { id },
    });

    if (!voice) {
      throw new NotFoundException(`Voice with ID ${id} not found`);
    }

    await this.voiceRepository.remove(voice);
    return id
  }
}
