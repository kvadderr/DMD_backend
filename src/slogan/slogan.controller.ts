import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SloganService } from './slogan.service';
import { CreateSloganDto } from './dto/create-slogan.dto';
import { UpdateSloganDto } from './dto/update-slogan.dto';

@Controller('slogan')
export class SloganController {
  constructor(private readonly sloganService: SloganService) {}

  @Post()
  create(@Body() createSloganDto: CreateSloganDto) {
    return this.sloganService.create(createSloganDto);
  }

  @Get()
  findAll() {
    return this.sloganService.findAll();
  }

  @Get()
  findOne() {
    return this.sloganService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSloganDto: UpdateSloganDto) {
    return this.sloganService.update(+id, updateSloganDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sloganService.remove(+id);
  }
}
