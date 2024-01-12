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


    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
        const { login, password: loginPassword } = loginUserDto;
        let existingUser: Omit<User, 'createdAt' | 'updatedAt'>;
        let isValid: boolean;

        try {
            existingUser = await this.userService.findUserWithPassword(login);
            console.log(existingUser)
            isValid = await bcrypt.compare(loginPassword, existingUser.password);
            if (!isValid) { throw new ForbiddenException('Username or password is invalid') }
        } catch (error) {
            throw new ForbiddenException('Username or password is invalid');
        }
        
        const { id, role } = existingUser;
        const { password, ...user } = existingUser;
        
        const tokens = this.authService.assignTokens(id, role);
        return tokens;
    }

    @Post('refresh-token')
    async getTokens(@Req() req): Promise<LoginResponse> {
        const token = req.cookies['refreshToken'];
        try {
            const {
                accessToken,
                refreshToken,
                user,
            } = await this.authService.refreshTokens(token);
            if (accessToken && user) {
                return { accessToken, refreshToken };
            }
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}