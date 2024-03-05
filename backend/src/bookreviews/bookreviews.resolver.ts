/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
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
    listReviewsByUser(@Args('userId', { type: () => String }) userId: string) {
        return this.bookReviewsService.findAllByUser(userId);
    }


    @Public()
    @Query(() => [BookReview])
    listReviewsByBook(@Args('id', { type: () => String }) bookId: string) {
        return this.bookReviewsService.findAllByBook(bookId);
    }


    @Public()
    @Query(() => BookReview)
    getReviewByUser(@Args('userId', { type: () => String } )userId: string,
    @Args('bookId', { type: () => String } )bookId: string) {
        return this.bookReviewsService.findOneByUser(userId, bookId);
    }

    @Public()
    @Query(() => [BookReview])
    listAllReviews() {
        return this.bookReviewsService.findAll();
    }

    ////////////////////////////////
    // MUTATIONS
    ////////////////////////////////

    @Mutation(() => BookReview)
    createBookReview(@Args('input') input: CreateBookReviewInput) {
        return this.bookReviewsService.create(input);
    }

    @Mutation(() => Book)
    removeBookReview(@Args('id') id: string) {
        return this.bookReviewsService.remove(id);
    }

    ////////////////////////////////
    // FIELD RESOLVERS
    ////////////////////////////////

    @ResolveField(() => [BookReview])
    async bookReviews(@Parent() book: Book) {
        return this.bookReviewsService.findAllByBook(book.id);
    }

    @ResolveField(() => Number)
    async aggregateScore(@Parent() book: Book) {
        return this.bookReviewsService.calculateAggregateScore(book.id);
    }
}
