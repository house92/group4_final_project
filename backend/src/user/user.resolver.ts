import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserInput } from './inputs/update-user.input';
import { Public } from 'src/auth/decorators/public.decorator';
import { CurrentRequestContext, RequestContext } from 'src/auth/decorators/current_request_context.decorator';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    listUsers() {
        return this.userService.findAll();
    }

    @Public()
    @Query(() => User)
    async getUser(@Args('id', { type: () => String }) id: string) {
        const user = await this.userService.findById(id, {
            friends: { bookReviews: { book: true } },
            bookReviews: { book: true },
        });

        // doing this avoids an additional join on the user table
        user.friends.forEach((friend) => {
            friend.bookReviews = friend.bookReviews.map((review) => ({ ...review, user: friend }));
        });

        return user;
    }

    @Mutation(() => User)
    updateUser(@Args('input') input: UpdateUserInput) {
        return this.userService.update(input);
    }

    @Mutation(() => User)
    removeUser(@Args('id', { type: () => Int }) id: number) {
        return this.userService.remove(id);
    }

    @Mutation(() => User)
    addFriend(
        @Args('friendId', { type: () => String }) friendId: string,
        @CurrentRequestContext() ctx: RequestContext,
    ) {
        const currentUserId = ctx.userId;
        return this.userService.addUserToCurrentUserFriends(currentUserId, friendId);
    }
}
