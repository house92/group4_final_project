/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookInput } from './inputs/create-book.input';
import { UpdateBookInput } from './inputs/update-book.input';
import { Public } from 'src/auth/decorators/public.decorator';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {}

    ////////////////////////////////
    // QUERIES
    ////////////////////////////////
    @Public()
    @Query(() => [Book])
    listBooks() {
        return this.booksService.findAll();
    }

    @Public()
    @Query(() => Book)
    async getBook(@Args('id', { type: () => String }) id: string) {
        return this.booksService.findById(id);
    }

    ////////////////////////////////
    // MUTATIONS
    ////////////////////////////////

    @Public()
    @Mutation(() => Book)
    createBook(@Args('input') input: CreateBookInput) {
        return this.booksService.create(input);
    }

    @Mutation(() => Book)
    updateBook(@Args('input') input: UpdateBookInput) {
        return this.booksService.update(input.id, input);
    }

    @Mutation(() => Book)
    removeBook(@Args('id', { type: () => Int }) id: number) {
        return this.booksService.remove(id);
    }
}
