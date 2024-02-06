import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './authors.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateAuthorsInput } from './inputs/create-authors.input';

@Resolver()
export class AuthorsResolver {
    constructor(private readonly authorsService: AuthorsService) {}
    @Public()
    @Query(() => [Author])
    listAuthors() {
        return this.authorsService.findAll();
    }

    @Public()
    @Query(() => Author)
    async getAuthor(@Args('id', { type: () => String }) id: string) {
        return this.authorsService.findById(id);
    }
    
    @Public()
    @Mutation(() => Author)
    createAuthor(@Args('input') input: CreateAuthorsInput) {
        return this.authorsService.create(input);
    }
}
