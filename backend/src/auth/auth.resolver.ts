import { Resolver, Mutation, Args, ObjectType, Field, Context, ID, Query } from '@nestjs/graphql';
import { DateTime } from 'luxon';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { UserAuthService } from '../user-auths/user-auth.service';
import { Public } from './decorators/public.decorator';
import { CurrentRequestContext, RequestContext } from './decorators/current_request_context.decorator';
import { UserService } from 'src/user/user.service';
import { UserAuth } from 'src/user-auths/user-auth.entity';
import { CreateUserAuthInput } from 'src/user-auths/inputs/create-user-auth-input';

const AUTHENTICATION_COOKIE_NAME = 'Authentication';

@ObjectType()
class UserSession {
    @Field(() => ID)
    id: string;

    @Field()
    firstName?: string;

    @Field()
    lastName?: string;

    @Field({ nullable: true })
    token?: string;
}

@Resolver()
export class AuthResolver {
    constructor(
        private readonly service: AuthService,
        private readonly userAuthService: UserAuthService,
        private readonly userService: UserService,
    ) {}

    @Public()
    @Mutation(() => UserAuth)
    async registerUser(@Args('input') input: CreateUserAuthInput): Promise<UserSession> {
        const userAuth = await this.userAuthService.createUser(input);

        await this.userService.create({ ...input, userAuthId: userAuth.id });

        const token = await this.service.generateToken(userAuth.id);

        return {
            id: userAuth.id,
            token,
        };
    }

    @Public()
    @Mutation(() => UserSession)
    async signInUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Context('res') res: Response,
    ): Promise<UserSession> {
        const { user, token } = await this.service.signIn(email, password);

        res.cookie(AUTHENTICATION_COOKIE_NAME, token, {
            httpOnly: true,
            expires: DateTime.now().plus({ days: 2 }).toJSDate(),
            path: '/',
            sameSite: 'lax',
            secure: true,
        });

        return {
            id: user.id,
            token,
        };
    }

    @Query(() => UserSession)
    async getUserSession(@CurrentRequestContext() ctx: RequestContext): Promise<UserSession> {
        return this.userAuthService.findById(ctx.userId);
    }
}
