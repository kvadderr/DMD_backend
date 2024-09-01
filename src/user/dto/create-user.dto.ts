export class CreateUserDto {
  id: string;
  nickName: string;
  avatar: string;
  favorites?: number[];
  countMinutes?: number;
  countSessions?: number;
}
