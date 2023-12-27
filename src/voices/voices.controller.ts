import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoicesService } from './voices.service';
import { CreateVoiceDto } from './dto/create-voice.dto';
import { UpdateVoiceDto } from './dto/update-voice.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/constants';

@ApiTags('Voices')
@Controller('voices')
export class VoicesController {
  constructor(private readonly voicesService: VoicesService) {}

  @Roles(UserRole.ROOT)
  @ApiOperation({ summary: "Добавить диктора. Только администратор" })
  @ApiResponse({ status: 201 })
  @Post()
  create(@Body() createVoiceDto: CreateVoiceDto) {
    return this.voicesService.create(createVoiceDto);
  }

  @Roles(UserRole.ROOT)
  @ApiOperation({ summary: "Найти дикторов. Только администратор" })
  @Get()
  findAll() {
    return this.voicesService.findAll();
  }

  @Roles(UserRole.ROOT)
  @ApiOperation({ summary: "Обновить дикторов. Только администратор" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoiceDto: UpdateVoiceDto) {
    return this.voicesService.update(+id, updateVoiceDto);
  }

  @Roles(UserRole.ROOT)
  @ApiOperation({ summary: "Удалить дикторов. Только администратор" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voicesService.remove(+id);
  }
}
