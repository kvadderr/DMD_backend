import { ApiProperty } from "@nestjs/swagger";

export class CreateVoiceDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  photo: string;
  @ApiProperty()
  description: string;
}
