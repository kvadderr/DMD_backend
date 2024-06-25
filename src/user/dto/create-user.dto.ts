export class CreateUserDto {
  id: string;
  nickName: string;
  avatar: string;
  countMinutes?: number;
  countSessions?: number;
}
