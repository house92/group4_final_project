import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { UsersService } from './users.service';
import { CreateUserInput } from './inputs/create-user-input';
import { User } from './user.entity';
//import { AuthGuard } from './auth.guard';

@Public()
@Resolver()
export class UserResolver {
    constructor(private readonly service: UsersService) {}

    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput) {
        return this.service.createUser(input);
    }

    @Query(() => [String])
    async getAllEmails(): Promise<string[]> {
        const users = await this.service.findAll();
        return users.map((user) => user.email);
    }
}
