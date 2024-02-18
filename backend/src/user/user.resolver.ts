import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserInput } from './inputs/update-user.input';
import { Public } from 'src/auth/decorators/public.decorator';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    listUsers() {
        return this.userService.findAll();
    }

    @Public()
    @Query(() => User)
    getUser(@Args('id', { type: () => String }) id: string) {
        return this.userService.findById(id);
    }

    @Mutation(() => User)
    updateUser(@Args('input') input: UpdateUserInput) {
        return this.userService.update(input);
    }

    @Mutation(() => User)
    removeUser(@Args('id', { type: () => Int }) id: number) {
        return this.userService.remove(id);
    }
}
