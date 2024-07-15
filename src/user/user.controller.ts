import { Controller, Get, Post, Body, Patch, Param, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from 'src/constants';
import * as bcrypt from 'bcryptjs';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CreateStatisticDto } from 'src/statistic/dto/create-statistic.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/stat')
  addStat(@Body() createUserDto: CreateStatisticDto) {
    return this.userService.addStatistic(createUserDto);
  }

  @Get('/root')
  async createRoot() {
    const saltRounds = 12;
    
    const data = {
      nickname: 'root',
      role: UserRole.ROOT,
      login: process.env.ROOT_LOGIN,
      password: process.env.ROOT_PASSWORD,
    }
    console.log(data)
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    return this.userService.create(data);
  }
  
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/me')
  async getMe(@Query('id') id: string) {
    try {
      return this.userService.findOneById(id)
    } catch (error) {
      throw new NotFoundException(`Error`);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

}
