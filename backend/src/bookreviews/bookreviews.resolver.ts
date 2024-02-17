/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookReviewsService } from './bookreviews.service';
import { BookReview } from './bookreview.entity';
import { Book } from 'src/books/book.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateBookReviewInput } from './inputs/create-bookreview.input';

@Resolver(() => Book)
export class BookReviewsResolver {
    constructor(private readonly bookReviewsService: BookReviewsService) {}

    ////////////////////////////////
    // QUERIES
    ////////////////////////////////

    @Public()
    @Query(() => [BookReview])
    listReviewsByUser(userId: string) {
        return this.bookReviewsService.findAllByUser(userId);
    }

    @Public()
    @Query(() => BookReview)
    listReviewsByBook(bookId: string) {
        return this.bookReviewsService.findAllByBook(bookId);
    }
    @Public()
    @Query(() => BookReview)
    getReviewByUser(userId: string, bookId: string) {
        return this.bookReviewsService.findOneByUser(userId, bookId);
    }

    ////////////////////////////////
    // MUTATIONS
    ////////////////////////////////

    @Mutation(() => Book)
    createBookReview(@Args('input') input: CreateBookReviewInput) {
        return this.bookReviewsService.create(input);
    }

    @Mutation(() => Book)
    removeBookReview(@Args('id') id: string) {
        return this.bookReviewsService.remove(id);
    }
}
