import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateAuthorInput } from './inputs/create-author.input';
import { UpdateAuthorInput } from './inputs/update-author.input';
import { AuthorConnection, AuthorConnectionArgs, AuthorConnectionBuilder } from './pagination/authors.pagination';
import { BooksService } from 'src/books/books.service';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(
        private readonly authorsService: AuthorsService,
        private readonly booksService: BooksService,
    ) {}
    @Public()
    @Query(() => AuthorConnection)
    async listAuthors(@Args() connectionArgs: AuthorConnectionArgs): Promise<AuthorConnection> {
        // Create builder instance
        const connectionBuilder = new AuthorConnectionBuilder(connectionArgs);

        // EXAMPLE: Do whatever you need to do to fetch the current page of authors
        const [authors, count] = await this.authorsService.findAll({
            limit: connectionBuilder.edgesPerPage, // how many rows to fetch
            from: connectionBuilder.startOffset, // row offset at which to start
        });

        // Return resolved AuthorConnection with edges and pageInfo
        return connectionBuilder.build({
            totalEdges: count,
            nodes: authors,
        });
    }

    @Public()
    @Query(() => Author)
    async getAuthor(@Args('id', { type: () => String }) id: string) {
        return this.authorsService.findById(id);
    }

    @Public()
    @Mutation(() => Author)
    createAuthor(@Args('input') input: CreateAuthorInput) {
        return this.authorsService.create(input);
    }
    @Public()
    @Mutation(() => Author)
    updateAuthor(@Args('input') input: UpdateAuthorInput) {
        return this.authorsService.update(input);
    }
    @Public()
    @Mutation(() => Author)
    removeAuthor(@Args('id', { type: () => String }) id: number) {
        return this.authorsService.remove(id);
    }
  
    ////////////////////////////////
    // FIELD RESOLVERS
    ////////////////////////////////

    @ResolveField(() => Number)
    async rating(@Parent() author: Author) {
        const bookRating = await Promise.all(
            author.books.map(async (book) => await this.booksService.averageRating(book.id)),
        );
        const totalRating = bookRating.reduce((acc, rating) => acc + rating, 0);
        return totalRating / author.books.length;
    }
}
