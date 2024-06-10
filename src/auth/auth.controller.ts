import {
    Controller,
    Post,
    Req,
    Body,
    BadRequestException,
    ForbiddenException,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginResponse } from './type/loginResponse';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { CookieInterceptor } from './interceptor/cookie.interceptor';
import { Roles } from './decorator/roles.decorator';

@UseInterceptors(CookieInterceptor)
@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}


  
}