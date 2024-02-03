import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        const isPasswordMatching = await bcrypt.compare(password, user.passwordhash);

        if (!isPasswordMatching) {
            console.warn(`incorrect password for ${email}`);
            throw new UnauthorizedException('There is no user with that email and password');
        }

        const token = await this.jwtService.signAsync({ userId: user.id });

        return { user, token };
    }
}
