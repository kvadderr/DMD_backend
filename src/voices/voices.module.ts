import { Module } from '@nestjs/common';
import { VoicesService } from './voices.service';
import { VoicesController } from './voices.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Voice } from './entities/voice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voice]),
  ],
  controllers: [VoicesController],
  providers: [VoicesService],
})
export class VoicesModule {}
