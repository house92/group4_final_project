import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorsInput {

    @Field(() => String, { description: 'Author first name' })
    firstName: string;

    @Field(() => String, { description: 'Author last name' })
    lastName: string;

    @Field(() => String, { description: 'Author year of death' })
    dateOfBirth: string;

    @Field(() => String, { description: 'Author year of death' })
    dateOfDeath: string;

    @Field(() => String, { description: 'Author hometown' })
    hometown: string;

    @Field(() => String, { description: 'Bio of author' })
    bio: string;
}