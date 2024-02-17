import { Module } from '@nestjs/common';
import { BookReviewsService } from './bookreviews.service';
import { BookReviewsResolver } from './bookreviews.resolver';
import { BookReview } from './bookreview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BookReview])], // Register TypeORM entity
    providers: [BookReviewsResolver, BookReviewsService],
})
export class BookReviewsModule {}
