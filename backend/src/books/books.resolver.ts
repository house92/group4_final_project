/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookInput } from './inputs/create-book.input';
import { UpdateBookInput } from './inputs/update-book.input';
import { Public } from 'src/auth/decorators/public.decorator';
import { BookConnection, BookConnectionArgs, BookConnectionBuilder } from './pagination/books.pagination';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {}

    ////////////////////////////////
    // QUERIES
    ////////////////////////////////
    @Public()
    @Query(() => BookConnection)
    async listBooks(@Args() connectionArgs: BookConnectionArgs): Promise<BookConnection> {
        // Create builder instance
        const connectionBuilder = new BookConnectionBuilder(connectionArgs);

        // EXAMPLE: Do whatever you need to do to fetch the current page of books
        const [books, count] = await this.booksService.findAll({
            limit: connectionBuilder.edgesPerPage, // how many rows to fetch
            from: connectionBuilder.startOffset, // row offset at which to start
        });

        // Return resolved BookConnection with edges and pageInfo
        return connectionBuilder.build({
            totalEdges: count,
            nodes: books,
        });
    }

    @Public()
    @Query(() => Book)
    async getBook(@Args('id', { type: () => String }) id: string) {
        return this.booksService.findById(id, { authors: true, bookReviews: { user: true } });
    }

    ////////////////////////////////
    // MUTATIONS
    ////////////////////////////////

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
