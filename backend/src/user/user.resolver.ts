import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => User)
    createUser(@Args('input') input: CreateUserInput) {
        return this.userService.create(input);
    }

    @Query(() => [User])
    listUsers() {
        return this.userService.findAll();
    }

    @Query(() => User)
    getUser(@Args('id', { type: () => String }) id: number) {
        return this.userService.findOne(id);
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
