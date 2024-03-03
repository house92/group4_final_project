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
    getUser(@Args('id', { type: () => String }) id: string) {
        return this.userService.findById(id, { friends: true, bookReviews: { book: true } });
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

    @Mutation(() => Boolean)
    async acceptInvite(
        @Args('isUser') isUser: string,
        @Args('invitedUser') invitedUser: string,
        @Args({ name: 'accepted', defaultValue: false }) accepted: boolean,
        @CurrentRequestContext() ctx: RequestContext,
    ): Promise<boolean> {
        try {
            const currentUserId = ctx.userId;
            this.userService.addUserToCurrentUserFriends(currentUserId, invitedUser);
            return true;
        } catch (error) {
            return false;
        }
    }
    //this mutation may be repetative with addFriend?
   /*  @Mutation(() => User)
    acceptInvite(
        @Args('friendId', { type: () => String }) friendId: string,
        @Args('acceptInvite', { nullable: true, defaultValue: false }) addInvite: boolean,
        @CurrentRequestContext() ctx: RequestContext,
    ) {
        const currentUserId = ctx.userId;
        return this.userService.addUserToCurrentUserFriends(currentUserId, friendId);
    } */

   /*  @Mutation(() => Boolean)
    async acceptInvite(
        @Args('friendId', { type: () => String }) friendId: string,
        @CurrentRequestContext() ctx: RequestContext,
    ) {
        const currentUserId = ctx.userId;
        // Find the receiving user
        const receivingUser = await this.userService.findById(friendId);
        if (!receivingUser || !friendId) {
            return false; // User not found or has no received invites
        }

        // Check if invitingUserId is in the list of received invites
        const inviteIndex = receivingUser.receivedInvites.findIndex(invite => invite === invitingUserId);
        if (inviteIndex === -1) {
            return false; // The inviting user is not in the received invites list
        }

        // Remove inviting user from received invites list and update the user
        receivingUser.receivedInvites.splice(inviteIndex, 1);
        await this.userService.update(receivingUser);
        return true;
    } */


    /* @Query(() => Boolean)
    isFriendInvited(
        @Args('friendId', { type: () => String }) friendId: string,
        @CurrentRequestContext() ctx: RequestContext,
    ) {
        const currentUserId = ctx.userId;

        if (!currentUserId || !friendId) {
            return false; 
        }
        return this.userService.findById(friendId);
    }
 */
    /* @Mutation(() => User)
    inviteFriend(
        @Args('invitedFriend', { type: () => String }) invitedFriend: string,

    ) */
}
