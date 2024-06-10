import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { AccessTokenPayload, RefreshTokenPayload } from './type/jwtPayload';
import { UserRole } from 'src/constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService) { }

    createAccessToken({ userId, role }: AccessTokenPayload): string {
        return sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
        });
    }

    createRefreshToken({ userId }: RefreshTokenPayload): string {
        return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
        });
    }

    assignTokens(userId: string, role: UserRole) {
        return {
            accessToken: this.createAccessToken({ userId, role }),
            refreshToken: this.createRefreshToken({ userId }),
        };
    }

    /** If refresh token is not expired, re-assign new access token and refresh token */
    async refreshTokens(refreshToken: string) {
        // let decodedRefreshToken: RefreshTokenPayload;
        // let user: UserResponse;

        const decodedRefreshToken = verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        );
        const user = await this.userService.findOneById(decodedRefreshToken.userId);

        // If user is not found or the refresh token version doesn't match, throw error
        if (!user) {
            throw new Error('Please register or sign in.');
        }

        const { id } = user;

        const tokens = await this.assignTokens(id, UserRole.ADMIN);
        return {
            user,
            ...tokens,
        };
    }

}