import { Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserAuthService } from './user-auth.service';

@Public()
@Resolver()
export class UserAuthResolver {
    constructor(private readonly service: UserAuthService) {}
}
