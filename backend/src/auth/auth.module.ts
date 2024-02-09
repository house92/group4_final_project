import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthResolver } from './auth.resolver';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10h' },
        }),
    ],
    providers: [AuthService, AuthResolver, AuthGuard],
    exports: [AuthService, AuthResolver],
})
export class AuthModule {}
