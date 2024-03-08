import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserAuthService } from '../user-auth/user-auth.service';

@Injectable()
export class AuthService {
    constructor(
        private userAuthService: UserAuthService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string) {
        const userAuth = await this.userAuthService.findByEmail(email, { user: true });

        const isPasswordMatching = await bcrypt.compare(password, userAuth.passwordhash);

        if (!isPasswordMatching) {
            console.warn(`incorrect password for ${email}`);
            throw new UnauthorizedException('There is no user with that email and password');
        }

        return { user: userAuth.user };
    }

    async signOut() {
        return {
            id: '',
            firstName: null,
            lastName: null,
            token: null,
        };
    }

    async generateToken(userId: string) {
        return this.jwtService.signAsync({ userId });
    }
}
