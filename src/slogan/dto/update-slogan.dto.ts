import { PartialType } from '@nestjs/swagger';
import { CreateSloganDto } from './create-slogan.dto';

export class UpdateSloganDto extends PartialType(CreateSloganDto) {}
