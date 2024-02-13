import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './user-auth.entity';
import { UserAuthResolver } from './user-auth.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([UserAuth])],
    providers: [UserAuthService, UserAuthResolver],
    exports: [UserAuthService],
})
export class UserAuthModule {}
