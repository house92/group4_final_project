import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
    @Field(() => String, { description: 'Author first name' })
    firstName: string;

    @Field(() => String, { description: 'Author last name' })
    lastName: string;

    @Field(() => Date, { description: 'Author year of death' })
    dateOfBirth: Date;

    @Field(() => Date, { description: 'Author year of death', nullable: true })
    dateOfDeath?: Date;

    @Field(() => String, { description: 'Author hometown', nullable: true })
    hometown?: string;

    @Field(() => String, { description: 'Biography of author', nullable: true })
    bio?: string;

    @Field(() => [ID], { nullable: true })
    bookIds?: string[];
}
