import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBookReviewInput {
    @Field(() => String, { description: 'Id of the reviewer' })
    userId: string;

    @Field(() => String, { description: 'Id of the book being reviewed' })
    bookId: string;

    @Field(() => String, { description: 'Body of the review' })
    body: string;

    @Field(() => Number, { description: 'Rating tied to review' })
    rating: number;
}
