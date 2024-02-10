import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserAuthService } from './user-auth.service';
import { CreateUserAuthInput } from './inputs/create-user-auth-input';
import { UserAuth } from './user-auth.entity';
//import { AuthGuard } from './auth.guard';

@Public()
@Resolver()
export class UserAuthResolver {
    constructor(private readonly service: UserAuthService) {}

    @Public()
    @Mutation(() => UserAuth)
    async registerUser(@Args('input') input: CreateUserAuthInput) {
        return this.service.createUser(input);
    }
}
