import { Module } from '@nestjs/common';
import { MeditationService } from './meditation.service';
import { MeditationController } from './meditation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Meditation } from './entities/meditation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meditation]),
  ],
  controllers: [MeditationController],
  providers: [MeditationService],
})
export class MeditationModule {}
