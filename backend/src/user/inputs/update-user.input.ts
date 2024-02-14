import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(OmitType(CreateUserInput, ['userAuthId'])) {
    @Field(() => ID)
    id: string;
}
