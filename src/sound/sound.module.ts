import { Module } from '@nestjs/common';
import { SoundService } from './sound.service';
import { SoundController } from './sound.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sound } from './entities/sound.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sound]),
  ],
  controllers: [SoundController],
  providers: [SoundService],
})
export class SoundModule {}
