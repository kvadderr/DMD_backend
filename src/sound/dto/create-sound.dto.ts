import { ApiProperty } from "@nestjs/swagger";

export class CreateSoundDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  sound: string;
}
