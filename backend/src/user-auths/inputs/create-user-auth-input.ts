import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserAuthInput {
    @Field()
    email: string;

    @Field()
    password: string;
}
