import { ApiProperty } from "@nestjs/swagger";

export class CreateSloganDto {
  @ApiProperty()
  title: string;
  
  @ApiProperty()
  image: string;

  @ApiProperty()
  description: string;
}
