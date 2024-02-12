import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserAuthService } from './user-auth.service';
import { CreateUserAuthInput } from './inputs/create-user-auth-input';
import { UserAuth } from './user-auth.entity';
//import { AuthGuard } from './auth.guard';

@Public()
@Resolver()
export class UserAuthResolver {
    constructor(private readonly service: UserAuthService) {}

    @Mutation(() => UserAuth)
    async createUser(@Args('input') input: CreateUserAuthInput) {
        return this.service.createUser(input);
    }

    @Query(() => [String])
    async getAllEmails(): Promise<string[]> {
        const users = await this.service.findAll();
        return users.map((user) => user.email);
    }
}
