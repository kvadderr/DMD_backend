import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistic } from './entities/statistic.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticService {

  constructor(
    @InjectRepository(Statistic)
    private readonly statisticRepository: Repository<Statistic>,
    private readonly userService: UserService
  ) { }
  
  async addStatistic(data: CreateStatisticDto) {
    
    const {userId, minutes, sessions} = data;
  
    const user = await this.userService.findOne(userId);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    let statistic = await this.statisticRepository.findOne({ where: { userId } });
  
    if (!statistic) {
      statistic = new Statistic();
      statistic.user = user;
      statistic.userId = userId;
    }
  
    statistic.incrementSessionsAndMinutes(minutes, sessions);
  
    return this.statisticRepository.save(statistic);
  }
}
