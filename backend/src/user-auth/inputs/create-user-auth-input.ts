import { InputType, Field, OmitType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/inputs/create-user.input';

@InputType()
export class CreateUserAuthInput extends OmitType(CreateUserInput, ['userAuthId']) {
    @Field()
    email: string;

    @Field()
    password: string;
}
