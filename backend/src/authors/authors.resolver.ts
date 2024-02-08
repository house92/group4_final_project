import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './authors.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateAuthorsInput } from './inputs/create-authors.input';
import { UpdateAuthorInput } from './inputs/update-authors.input';

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
    @Public()
    @Mutation(() => Author)
    updateAuthor(@Args('input') input: UpdateAuthorInput) {
        return this.authorsService.update(input.id, input);
    }
    @Public()
    @Mutation(() => Author)
    removeAuthor(@Args('id', { type: () => String }) id: number) {
        return this.authorsService.remove(id);
    }
}
