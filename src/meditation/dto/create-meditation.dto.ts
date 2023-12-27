import { Category } from "src/category/entities/category.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Lang } from "src/constants";
export class CreateMeditationDto {
  @ApiProperty()
  lang?: Lang;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  categories?: Category[];
  @ApiProperty()
  isSubscribed: boolean;
  @ApiProperty()
  audioLenght: number;
  @ApiProperty()
  photoId: string;
}
