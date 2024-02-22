import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BookReview } from 'src/bookreviews/bookreview.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, BookReview])],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
