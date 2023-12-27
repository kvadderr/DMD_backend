import { UserRole } from "src/constants";

export class RegisterUserDto {
  id?: string;
  email: string;
  password?: string;
  role: UserRole;
}