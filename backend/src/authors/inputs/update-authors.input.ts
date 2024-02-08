import { CreateAuthorsInput } from './create-authors.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorsInput) {
    @Field(() => String)
    id: string;
}
