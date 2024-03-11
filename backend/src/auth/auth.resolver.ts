import { Resolver, Mutation, Args, ObjectType, Field, Context, ID, Query } from '@nestjs/graphql';
import { DateTime } from 'luxon';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { UserAuthService } from '../user-auth/user-auth.service';
import { Public } from './decorators/public.decorator';
import { CurrentRequestContext, RequestContext } from './decorators/current_request_context.decorator';
import { UserService } from 'src/user/user.service';
import { CreateUserAuthInput } from 'src/user-auth/inputs/create-user-auth-input';

const AUTHENTICATION_COOKIE_NAME = 'Authentication';

@ObjectType()
class UserSession {
    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
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
    @Mutation(() => UserSession)
    async registerUser(@Args('input') input: CreateUserAuthInput): Promise<UserSession> {
        const userAuth = await this.userAuthService.createUser(input);

        const user = await this.userService.create({ ...input, userAuthId: userAuth.id }, userAuth);

        const token = await this.service.generateToken(user.id);

        return {
            id: user.id,
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
        const { user } = await this.service.signIn(email, password);

        const token = await this.service.generateToken(user.id);

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
    @Public()
    @Mutation(() => UserSession)
    async signOutUser(@Context('res') res: Response): Promise<object> {
        res.cookie(AUTHENTICATION_COOKIE_NAME, null, {
            httpOnly: true,
            maxAge: 1,
            path: '/',
            sameSite: 'lax',
            secure: true,
        });

        return { success: true };
    }

    @Query(() => UserSession)
    async getUserSession(@CurrentRequestContext() ctx: RequestContext): Promise<UserSession> {
        return this.userService.findById(ctx.userId);
    }
}
