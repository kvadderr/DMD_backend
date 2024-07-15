import { Module, forwardRef } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Statistic]),
    forwardRef(() => UsersModule),
  ],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
