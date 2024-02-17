import { Module } from '@nestjs/common';
import { BookReviewsService } from './bookreviews.service';
import { BookReviewsResolver } from './bookreviews.resolver';

@Module({
    providers: [BookReviewsResolver, BookReviewsService],
})
export class BookReviewsModule {}