import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthModule } from '../user-auth/user-auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthResolver } from './auth.resolver';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        UserAuthModule,
        UserModule,
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
