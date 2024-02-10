import { Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserAuthService } from './user-auth.service';
//import { AuthGuard } from './auth.guard';

@Public()
@Resolver()
export class UserAuthResolver {
    constructor(private readonly service: UserAuthService) {}
}
