import { Module } from '@nestjs/common';
import { SloganService } from './slogan.service';
import { SloganController } from './slogan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slogan } from './entities/slogan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Slogan]),
  ],
  controllers: [SloganController],
  providers: [SloganService],
})
export class SloganModule { }
