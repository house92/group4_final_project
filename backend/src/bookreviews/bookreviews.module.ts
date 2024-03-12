import { Module } from '@nestjs/common';
import { BookReviewsService } from './bookreviews.service';
import { BookReviewsResolver } from './bookreviews.resolver';
import { BookReview } from './bookreview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { User } from 'src/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookReview, Book, User])], // Register TypeORM entity
    providers: [BookReviewsResolver, BookReviewsService],
    exports: [BookReviewsService],
})
export class BookReviewsModule {}
