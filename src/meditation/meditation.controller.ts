import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeditationService } from './meditation.service';
import { CreateMeditationDto } from './dto/create-meditation.dto';
import { UpdateMeditationDto } from './dto/update-meditation.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/constants';
@ApiTags('Медитация')
@Controller('meditation')
export class MeditationController {
  constructor(private readonly meditationService: MeditationService) {} 

  @ApiOperation({ summary: "Создать медитацию" })
  @ApiResponse({ status: 201 })
  @Post()
  create(@Body() createMeditationDto: CreateMeditationDto) {
    return this.meditationService.create(createMeditationDto);
  }

  @ApiOperation({ summary: "Получить список всех медитаций" })
  @ApiResponse({ status: 200 })
  @Get()
  findAll() {
    return this.meditationService.findAll();
  }

  @ApiOperation({ summary: "Обновить медитацию. Доступно только администратору" })
  @ApiResponse({ status: 200 })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMeditationDto: UpdateMeditationDto) {
    return this.meditationService.update(+id, updateMeditationDto);
  }

}
