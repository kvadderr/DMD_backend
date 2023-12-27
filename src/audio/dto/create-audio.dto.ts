import { ApiProperty } from "@nestjs/swagger";
import { Meditation } from "src/meditation/entities/meditation.entity";
import { Voice } from "src/voices/entities/voice.entity";
export class CreateAudioDto {

  @ApiProperty()
  link: string;

}
